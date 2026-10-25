# Fly.io

There is no connector. Keyhouse records a placement; the agent must update Fly again for future rotation.

Set `fly secrets set OPENAI_API_KEY=<proxy-key> OPENAI_BASE_URL=<gateway-url> --app <app> --stage`, then `fly deploy --app <app>`. Without `--stage`, setting secrets triggers a deployment immediately. Use the application's exact Fly app.

Change the image's CMD, or the applicable `[processes]` entry in `fly.toml`, to change the start command. Fly supports long-running processes and a future `keyhouse run -- node server.js`, provided the CLI is in the image. The relay itself is not built yet.

Never print existing secret values or dump process environments. `fly secrets list` shows names/digests, but do not substitute an SSH environment dump. Keep real tracked values in Fly secrets. Verify the new Machine's integration path and Keyhouse usage after deploying.

Checked 2026-10-23: [secrets set](https://fly.io/docs/flyctl/secrets-set/), [process configuration](https://fly.io/docs/reference/configuration/), [deploy](https://fly.io/docs/flyctl/deploy/).
