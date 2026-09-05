import { getSandbox } from '@cloudflare/sandbox'

const SANDBOX_ID = 'frier-code-server'

export default defineEventHandler(async (event) => {
  const env = event.context.cloudflare.env
  if (!env.Sandbox) {
    throw createError({ statusCode: 500, statusMessage: 'Sandbox binding not available' })
  }

  const sandbox = getSandbox(env.Sandbox, SANDBOX_ID, {
    sleepAfter: '30m',
    transport: 'rpc'
  })

  await sandbox.exec(
    'code-server --bind-addr 0.0.0.0:8443 --auth none --disable-telemetry'
  )

  const tunnel = await sandbox.tunnels.get(8443)

  return { id: SANDBOX_ID, url: tunnel.url }
})
