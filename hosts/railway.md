# Railway

Railway is the only host with a Keyhouse connector. `keyhouse connect railway --project <project-id>` seals the local Railway token to the connectors public key. The connector can import, write replacement variables, redeploy and rotate later within the authorized scope. Prefer that connector to reading host values into an agent.

With an already linked Railway CLI, the fallback variable command is `railway variable set OPENAI_API_KEY=<proxy-key> OPENAI_BASE_URL=<gateway-url> --service <service> --environment <environment> --skip-deploys`. Select the right project first. The explicit `--skip-deploys` prevents the variable write from deploying before all changes are ready; deploy with `railway up --service <service> --environment <environment>` and verify that exact environment.

Set the service's start command in Settings, Deploy, Start Command, or set `deploy.startCommand` in `railway.toml`. Use the application's real command. A future relay can use `keyhouse run -- node server.js`; it fits Railway's process model but the CLI relay is not built yet.

Never run variable dumps, CLI JSON inventory or verbose HTTP tracing that exposes existing values. Discard mutation responses if they echo values. Observe deployments through status and metadata. Exercise the integration and check Keyhouse usage before declaring success.

Checked 2026-10-23: [CLI variable](https://docs.railway.com/cli/variable), [up](https://docs.railway.com/cli/up), [start command](https://docs.railway.com/guides/start-command), [config as code](https://docs.railway.com/reference/config-as-code).
