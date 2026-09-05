import { getSandbox, type Sandbox } from '@cloudflare/sandbox'

const CONFIG: Record<string, { binding: string; port: number; id: string }> = {
  codeserver: { binding: 'Sandbox_CODESERVER', port: 8443, id: 'frier-code-server' },
  marimo: { binding: 'Sandbox_MARIMO', port: 8080, id: 'frier-marimo' },
}

export default defineEventHandler(async (event) => {
  const name = getRouterParam(event, 'name')
  const cfg = CONFIG[name ?? '']
  if (!cfg) throw createError({ status: 400, message: `Unknown service: ${name}` })

  const env = event.context.cloudflare.env[cfg.binding] as DurableObjectNamespace<Sandbox<unknown>>
  if (!env) throw createError({ status: 500, message: `${cfg.binding} binding missing` })

  const sandbox = getSandbox(env, cfg.id, {
    sleepAfter: '30m',
    transport: 'rpc',
  })

  console.log(`[${name}] Destroying sandbox`)
  await sandbox.destroy()

  console.log(`[${name}] Starting sandbox`)
  await sandbox.start(undefined, {
    retries: 10,
    portToCheck: cfg.port,
    waitInterval: 1000,
  })

  console.log(`[${name}] Destroying tunnels`)
  await sandbox.tunnels.destroy(cfg.port)

  console.log(`[${name}] Getting tunnel`)
  const tunnel = await sandbox.tunnels.get(cfg.port)

  return { id: cfg.id, url: tunnel.url }
})
