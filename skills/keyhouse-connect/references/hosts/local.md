# Local environment files

There is no host connector. The agent updates the local `.env` and records its placement when the server supports placements. Future rotation requires another local edit.

Use a local file-editing process to set `OPENAI_API_KEY=<proxy-key>` and `OPENAI_BASE_URL=<gateway-url>` in `.env`, without reading its current values into chat. Keep the file ignored by Git and mode 0600. Do not use `cat .env`, shell tracing or a command that echoes every variable.

Start Node 24 with `node --env-file=.env server.js`, or retain the project's existing environment loader. Change the package start script if needed. Restart the owned process to pick up changes; there is no deployment command. A future start command can be `keyhouse run -- node --env-file=.env server.js`, but the relay is not built yet.

Run the integration request, then `keyhouse verify`. Check only variable names and verification results. Keep tracked secrets such as database URLs unchanged until an authorized rotation is ready.

Checked 2026-10-23: [Node --env-file](https://nodejs.org/api/cli.html#--env-filefile), [npm scripts](https://docs.npmjs.com/cli/v11/using-npm/scripts).
