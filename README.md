# Keyhouse agent kit

A Node 24 CLI, Agent Skill and integration guides for connecting application credentials to Keyhouse.

```sh
npm install --global keyhouse@0.1.0
keyhouse init --url https://your-keyhouse.example --json
keyhouse scan --json
keyhouse import --only OPENAI_API_KEY
keyhouse skill install
keyhouse mcp
keyhouse verify
```

Approve the link and compare the user code on your own device. The CLI seals imports locally and keeps the agent token in private user configuration. Discovery prints names and types; it never prints credential values. An MCP client runs `keyhouse mcp` without a token in its client configuration.

Read [integration guides](site/llms.txt) or run `keyhouse guide methods base-url` and `keyhouse guide hosts railway`. Use `keyhouse guide methods run` for the local `keyhouse run -- <command>` relay. Server setup/verification actions report their availability separately.

This distribution includes a bundled CLI. The CLI and catalogue use Apache-2.0; [third-party notices](THIRD_PARTY_LICENSES.txt) cover bundled dependencies.
