/**
 * adapted from:https://github.com/nitrojs/nitro/discussions/3099#discussioncomment-13618572
 */
import preset from 'nitropack/presets/cloudflare/runtime/cloudflare-module'

import { Sandbox } from '@cloudflare/sandbox'

export default preset
export { Sandbox, Sandbox as Sandbox_CODESERVER, Sandbox as Sandbox_MARIMO }
