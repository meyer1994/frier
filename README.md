# frier

A single-page Nuxt app that spins up a remote [code-server](https://github.com/coder/code-server) instance inside a [Cloudflare Sandbox](https://developers.cloudflare.com/workers/runtime-apis/sandbox/) container and exposes it via a public tunnel.

## Commands

```bash
pnpm install       # Install dependencies
pnpm dev           # Local development (nitro-cloudflare-dev)
pnpm build         # Build for Cloudflare
pnpm cf:deploy     # Deploy to Cloudflare Workers
pnpm cf:secrets    # Bulk upload secrets from .env
```

## Deploy

1. Build: `pnpm build`
2. Deploy: `pnpm cf:deploy`
3. Visit the site and click **Get VS Code URL**.
