import { getSandbox, type Sandbox } from '@cloudflare/sandbox'

const SANDBOX_ID = 'frier-code-server'

async function getTunnel(id: string, env: { Sandbox: DurableObjectNamespace<Sandbox> }): Promise<string> {
  const sandbox = getSandbox(env.Sandbox, id, {
    sleepAfter: '30m',
    transport: 'rpc'
  })

  try {
    const tunnel = await sandbox.tunnels.get(8443)
    return tunnel.url
  } catch {
    // Port not ready — start the server and retry
  }

  await sandbox.exec('/start')

  // Wait for code-server to boot (retry tunnel a few times)
  for (let i = 0; i < 10; i++) {
    try {
      const tunnel = await sandbox.tunnels.get(8443)
      return tunnel.url
    } catch {
      await new Promise(r => setTimeout(r, 500))
    }
  }

  throw createError({ statusCode: 500, statusMessage: 'Failed to open tunnel after starting code-server' })
}

export default defineEventHandler(async (event) => {
  const env = event.context.cloudflare.env
  if (!env.Sandbox) {
    throw createError({ statusCode: 500, statusMessage: 'Sandbox binding not available' })
  }

  const url = await getTunnel(SANDBOX_ID, env)
  return { id: SANDBOX_ID, url }
})
