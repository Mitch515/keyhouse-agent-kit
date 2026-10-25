# Netlify

There is no connector. Record the placement and update Netlify again when keys rotate.

With the correct site linked, set `netlify env:set OPENAI_API_KEY <proxy-key> --context production` and `netlify env:set OPENAI_BASE_URL <gateway-url> --context production`. These new proxy values may be supplied by a local process. Do not use CLI arguments or temporary files to shuttle an existing real secret through an agent. Preserve the intended scopes and deployment context.

Netlify functions have no persistent start command for `keyhouse run`. Use the SDK's base URL in server code. Build-command settings run builds, not a runtime relay. Never bundle secrets into browser code or commit them in `netlify.toml`.

Run `netlify deploy --build --prod` to build and deploy the changed application. Environment changes require a fresh deployment. Exercise the function integration and check Keyhouse usage on that deployment.

Never use `netlify env:list`, `env:get` or debug logs to expose existing values. Only names, types and success metadata belong in the agent's report.

Checked 2026-10-23: [env:set](https://cli.netlify.com/commands/env/), [deploy](https://cli.netlify.com/commands/deploy/).
