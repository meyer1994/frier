import { SandboxManager } from '~/server/utils/sandbox'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Missing sandbox id' })

  const env = event.context?.cloudflare?.env as { Sandbox: DurableObjectNamespace<unknown> } | undefined
  if (!env?.Sandbox) {
    throw createError({ statusCode: 500, statusMessage: 'Sandbox binding not available' })
  }

  const manager = new SandboxManager(env)
  const task = await manager.get(id)
  if (!task) throw createError({ statusCode: 404, statusMessage: 'Sandbox not found' })

  return task
})
