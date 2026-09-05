import { getSandbox, type Sandbox } from '@cloudflare/sandbox'

export default defineEventHandler(async (event) => {
  const sdk = event.context.cloudflare.env.Sandbox_MARIMO as DurableObjectNamespace<Sandbox<unknown>>
  if (!sdk) throw createError({ status: 500, message: 'Sandbox_MARIMO binding missing' })

  const sandbox = getSandbox(sdk, 'frier-marimo', { sleepAfter: '30m', transport: 'rpc' })

  console.log(`[frier-marimo] Destroying sandbox`)
  await sandbox.destroy()

  console.log(`[frier-marimo] Starting sandbox`)
  await sandbox.start(undefined, {
    retries: 10,
    portToCheck: 8080,
    waitInterval: 1000
  })

  console.log(`[frier-marimo] Destroying tunnel at port 8080`)
  await sandbox.tunnels.destroy(8080)

  console.log(`[frier-marimo] Getting tunnel at port 8080`)
  return await sandbox.tunnels.get(8080)
})
