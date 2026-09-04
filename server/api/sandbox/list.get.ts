import { SandboxManager } from '~/server/utils/sandbox'

export default defineEventHandler(async (event) => {
  const env = event.context?.cloudflare?.env as { Sandbox: DurableObjectNamespace<unknown> } | undefined
  if (!env?.Sandbox) {
    throw createError({ statusCode: 500, statusMessage: 'Sandbox binding not available' })
  }

  const manager = new SandboxManager(env)
  return manager.list()
})
