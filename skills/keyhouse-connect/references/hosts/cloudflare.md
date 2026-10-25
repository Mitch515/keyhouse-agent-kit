# Cloudflare Workers

There is no host connector. Record the placement; future rotation needs the agent to write the replacement again.

Use `wrangler secret put OPENAI_API_KEY` and supply the new proxy key through stdin. For a named environment append `--env <environment>` consistently. Put a nonsecret `OPENAI_BASE_URL` under `vars` for that environment in `wrangler.jsonc`, or use `wrangler secret put OPENAI_BASE_URL` as well. Access these through the Worker `env` bindings and pass them to the SDK explicitly.

Workers has no process start command. `keyhouse run` cannot run a local relay there. Use a base-URL client; a TCP or child-process workaround is not equivalent.

Deploy changed code and vars with `wrangler deploy --env <environment>`. A normal `secret put` creates/deploys a version itself; coordinate it with the code deploy. `wrangler versions secret put` only uploads a version and requires a separate version deployment, so do not interchange those commands silently.

Never print existing binding values, enable request-header dumps or return credentials from a diagnostic endpoint. Verify the deployed Worker's integration and Keyhouse usage.

Checked 2026-10-23: [Wrangler secret/deploy commands](https://developers.cloudflare.com/workers/wrangler/commands/), [secret bindings](https://developers.cloudflare.com/workers/configuration/secrets/).
