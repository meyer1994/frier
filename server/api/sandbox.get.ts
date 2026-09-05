import { getSandbox, type Sandbox } from '@cloudflare/sandbox'

const SANDBOX_ID = 'frier-code-server'

export default defineEventHandler(async (event) => {
  const env = event.context.cloudflare.env.Sandbox as DurableObjectNamespace<Sandbox<unknown>>
  if (!env) throw createError({ status: 500, message: 'Sandbox missing' })

  const sandbox = getSandbox(env, SANDBOX_ID, {
    sleepAfter: '30m',
    transport: 'rpc'
  })

  console.log('Destroying sandbox')
  await sandbox.destroy()

  console.log('Starting sandbox')
  await sandbox.start(undefined, {
    retries: 10,
    portToCheck: 8443,
    waitInterval: 1000
  })

  console.log('Destroying tunnels')
  await sandbox.tunnels.destroy(8443)

  console.log('Getting tunnel')
  const tunnel = await sandbox.tunnels.get(8443)

  return { id: SANDBOX_ID, url: tunnel.url }
})
