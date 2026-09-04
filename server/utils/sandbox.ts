import { Sandbox, getSandbox } from '@cloudflare/sandbox'

export { Sandbox }

export interface SandboxTask {
  id: string
  status: string
  image: string
  url?: string
  startedAt?: string
}

// In-memory registry of active sandboxes (ephemeral, per-isolate)
const registry = new Map<string, { startedAt: string, url?: string }>()

export class SandboxManager {
  private env: { Sandbox: DurableObjectNamespace<Sandbox> }

  constructor(env: { Sandbox: DurableObjectNamespace<Sandbox> }) {
    this.env = env
  }

  async list(): Promise<SandboxTask[]> {
    const tasks: SandboxTask[] = []
    for (const [id, meta] of registry) {
      tasks.push({
        id,
        status: 'RUNNING',
        image: 'httpbin',
        url: meta.url,
        startedAt: meta.startedAt
      })
    }
    return tasks
  }

  async get(id: string): Promise<SandboxTask | null> {
    const meta = registry.get(id)
    if (!meta) return null

    return {
      id,
      status: 'RUNNING',
      image: 'httpbin',
      url: meta.url,
      startedAt: meta.startedAt
    }
  }

  async start(): Promise<SandboxTask> {
    const id = crypto.randomUUID()
    const sandbox = getSandbox(this.env.Sandbox, id, {
      sleepAfter: '30m'
    })

    await sandbox.exec([
      'gunicorn',
      'httpbin:app',
      '-b',
      '0.0.0.0:8080'
    ])

    const tunnel = await sandbox.tunnels.get(8080)

    const startedAt = new Date().toISOString()
    registry.set(id, { startedAt, url: tunnel.url })

    return {
      id,
      status: 'RUNNING',
      image: 'httpbin',
      url: tunnel.url,
      startedAt
    }
  }

  async stop(id: string): Promise<string> {
    const sandbox = getSandbox(this.env.Sandbox, id)
    await sandbox.destroy()
    registry.delete(id)
    return id
  }
}
