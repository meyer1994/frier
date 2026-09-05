import { getSandbox, type Sandbox } from '@cloudflare/sandbox'

export default defineEventHandler(async (event) => {
  const sdk = event.context.cloudflare.env.Sandbox_CODESERVER as DurableObjectNamespace<Sandbox<unknown>>
  if (!sdk) throw createError({ status: 500, message: 'Sandbox_CODESERVER binding missing' })

  const sandbox = getSandbox(sdk, 'frier-code-server', { sleepAfter: '30m', transport: 'rpc' })

  console.log(`[frier-code-server] Destroying sandbox`)
  await sandbox.destroy()

  console.log(`[frier-code-server] Starting sandbox`)
  await sandbox.start(undefined, {
    retries: 10,
    portToCheck: 8443,
    waitInterval: 1000
  })

  console.log(`[frier-code-server] Destroying tunnel at port 8443`)
  await sandbox.tunnels.destroy(8443)

  console.log(`[frier-code-server] Getting tunnel at port 8443`)
  return await sandbox.tunnels.get(8443)
})
