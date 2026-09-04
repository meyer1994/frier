import { getSandbox } from '@cloudflare/sandbox'

const SANDBOX_ID = 'frier-httpbin'

export default defineEventHandler(async (event) => {
  const env = event.context.cloudflare.env
  if (!env.Sandbox) {
    throw createError({ statusCode: 500, statusMessage: 'Sandbox binding not available' })
  }

  const sandbox = getSandbox(env.Sandbox, SANDBOX_ID, {
    sleepAfter: '30m'
  })

  const tunnel = await sandbox.tunnels.get(8443)

  return { id: SANDBOX_ID, url: tunnel.url }
})
