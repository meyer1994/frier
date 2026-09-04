import type { Sandbox } from '@cloudflare/sandbox'

declare module 'h3' {
  interface H3EventContext {
    cf: CfProperties
    cloudflare: {
      env: {
        Sandbox: DurableObjectNamespace<Sandbox>
      }
      request: Request
      context: ExecutionContext
    }
  }
}

export {}
