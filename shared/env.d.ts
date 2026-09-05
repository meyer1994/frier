declare module 'h3' {
  interface H3EventContext {
    cf: CfProperties
    cloudflare: {
      request: Request
      env: Env & {
        Sandbox: DurableObjectNamespace<Sandbox>
      }
      context: ExecutionContext
    }
  }
}

export { }
