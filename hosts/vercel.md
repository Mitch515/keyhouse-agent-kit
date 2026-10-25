# Vercel

There is no connector yet. Record placements; the agent updates Vercel again for future rotation. Use the correct linked project and environment.

Set a server-only variable with `vercel env add OPENAI_API_KEY production`, supplying its new proxy key through stdin. Set `OPENAI_BASE_URL` the same way. For an existing name use `vercel env update OPENAI_API_KEY production`. Supply values from a local process; do not print or echo existing values. The CLI also accepts stdin redirected from a file, but do not create plaintext temporary files for real secrets.

Vercel functions have no persistent application start command. `keyhouse run` does not work there. Configure the SDK's base URL in code or env instead. Do not put keys in `NEXT_PUBLIC_`, `VITE_` or other browser-exposed variables.

Deploy the updated code and environment with `vercel deploy --prod`. Editing an environment variable does not change an existing immutable deployment. Verify the integration through the newly deployed function and check Keyhouse usage.

Never use `vercel env pull`, verbose diagnostics or an environment dump to bring existing secrets into agent output.

Checked 2026-10-23: [env add/update](https://vercel.com/docs/cli/env), [deploy](https://vercel.com/docs/cli/deploy).
