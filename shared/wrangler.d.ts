import type { Sandbox } from '@cloudflare/sandbox'

declare interface Env {
  Sandbox: DurableObjectNamespace<Sandbox>
}
