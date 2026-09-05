// Custom shim that extends Nitro's cloudflare-dev shim with `tracing`,
// which @cloudflare/sandbox imports but the built-in shim does not export.
//
// Re-exports everything from the official shim so we don't duplicate logic.
export * from 'nitropack/presets/cloudflare/runtime/shims/workers.dev'

// @cloudflare/sandbox defensively checks for tracing before using it,
// so `undefined` is enough to make it gracefully degrade.
export const tracing = undefined
