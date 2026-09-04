import { SandboxManager } from '~/server/utils/sandbox'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  if (!id) throw createError({ statusCode: 400, statusMessage: 'Missing sandbox id' })

  const env = event.context.cloudflare.env
  if (!env.Sandbox) {
    throw createError({ statusCode: 500, statusMessage: 'Sandbox binding not available' })
  }

  const manager = new SandboxManager(env)
  const stoppedId = await manager.stop(id)
  return { stopped: stoppedId }
})
