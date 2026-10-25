# Docker Compose

There is no connector. The agent edits the ignored `.env` used by Compose and declares the placement. Later rotation needs another edit and container recreation.

Set `OPENAI_API_KEY=<proxy-key>` and `OPENAI_BASE_URL=<gateway-url>` in the local ignored environment file using a process that never prints existing values. In Compose set `env_file: .env`, or explicitly map those names under the application's `environment`. A Compose interpolation `.env` alone does not put every variable in the container.

Set `command: ["node", "server.js"]` to change the container command, preserving its real arguments. The future relay form is `command: ["keyhouse", "run", "--", "node", "server.js"]`. Docker supports it, but the relay is not implemented yet. Install the CLI in the image before using it.

Apply with `docker compose up -d --build --force-recreate <service>`. Recreating is required for changed environment variables; `restart` alone reuses the old environment. Verify the integration after the new container is healthy.

Never run `docker compose config`, `docker inspect` or `docker exec ... env` into agent-visible output: they may reveal existing credentials. Do not bake secrets into image layers or build arguments. Use deployment metadata and Keyhouse usage for proof.

Checked 2026-10-23: [environment variables](https://docs.docker.com/compose/how-tos/environment-variables/set-environment-variables/), [service command](https://docs.docker.com/reference/compose-file/services/#command), [compose up](https://docs.docker.com/reference/cli/docker/compose/up/).
