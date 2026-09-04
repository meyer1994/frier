import { SandboxManager } from '~/server/utils/sandbox'

export default defineEventHandler(async (event) => {
  const env = event.context.cloudflare.env
  if (!env.Sandbox) {
    throw createError({ statusCode: 500, statusMessage: 'Sandbox binding not available' })
  }

  const manager = new SandboxManager(env)
  return manager.start()
})
