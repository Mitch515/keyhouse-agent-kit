---
name: keyhouse-connect
description: "Use when the developer says 'use Keyhouse in this project', asks to connect an app's API credentials to Keyhouse, or asks to sign an agent in with keyhouse init or login."
---

# Connect this project to Keyhouse

Run `keyhouse init --url <server origin> --json` in the project, or use its saved connection. To start self-hosting, explicitly select `keyhouse init --self-host <checkout path> --json`; bare `--self-host` selects the current directory only. For an existing account on a new machine or agent, run `keyhouse login --json`. Resolve the server with `--url`, `KEYHOUSE_URL`, or saved CLI config. A different saved origin requires the developer's explicit `--replace` choice. Never run a parent folder's scripts implicitly. Self-host results must be loopback. Use the same flow for hosted and self-hosted servers.

Relay the first JSON object's `approvalUrl` and `userCode` to the person, asking them to compare the code and approve on their own device. The CLI refuses approval URLs on a different origin. Wait for the final `ready` status; signup also waits for recovery-code confirmation. Never handle the person's passkey or recovery codes. When ready includes `message`, repeat its exact `Connected to workspace <name> (passkey <label>)` line to the person in your next message before importing anything or connecting a host. Let them spot an account chosen by someone else opening a leaked link. If an older server omits this confirmation, say it was not provided; do not invent it. Login refuses a workspace that differs from `keyhouse.json`; use `--replace` only when the developer explicitly intended to switch accounts. Keep the `kh_agent_` token in the CLI's private config. An MCP client runs `keyhouse mcp`; its config contains no token.

1. Discover with `keyhouse scan --json` and inspect HTTP call sites. Read names and detected types only. Discovery and import read project files, never the agent's shell credentials. Resolve conflicts with `--only VAR --from <file>`; do not choose a file silently. On Railway use metadata APIs; never dump variable values.
2. Plan with `keyhouse connect plan --json` or the `connect_plan` MCP tool. Read the catalogue's SDK entry and the matching guide through `keyhouse guide methods <name>` and `keyhouse guide hosts <name>`. Show one line per service and state unavailable actions.
3. Import local values with `keyhouse import [--only VAR,...]`. The command reports its destination, checks workspace identity and encrypts them locally; do not read `.env` values, paste a value into chat, put it in tool arguments, or create a plaintext temporary file. On Railway prefer the connector's server-side import. `keyhouse connect railway --project <id>` seals the host token locally.
4. Apply with `keyhouse connect apply --json` or `connect.apply`. For Railway pass `--project <id> --service <id> --environment <id>`; Keyhouse queues variable writes and redeployment through its connector. Preserve each returned key's app and destination binding. An unknown destination needs the person's approval of its exact host; relay that link and continue only with independent approved services. Do not invent a substitute endpoint when the action is unavailable.
5. Change the app and host using their guides. Only proxy keys and nonsecret base URLs go into the agent's context. Host writes and deployment still follow the developer's actual authorization. Only Railway has a connector that can write back and rotate by itself. For `keyhouse run`, follow the Run guide to register services, configure the gateway origin and check runtime support before changing the start command.
6. Exercise the application's smallest safe integration path, then `keyhouse verify`. Report a line per service with method, observed result and evidence. Use `keyhouse verify --json` for the local checks and server usage receipt. Requests and upstream success prove routing; a declared placement alone does not identify the caller host. Remind the person to rotate real credentials that used to be on the host through the normal rotation flow.

The setup scope permits create, sealed import, host connection and own-app usage reads. It does not permit reading real secrets, rotating, revoking, approving, changing settings, or using another agent's or the person's credentials. Production setup has the same scope; it does not bypass destination checks or expand deployment authority.

Choose the method by the SDK and host. These references are installed from the catalogue, never maintained separately:

- [Base URL](references/methods/base-url.md): SDKs with a configurable URL or hostname.
- [Run](references/methods/run.md): process hosts and clients that honor proxy environment variables.
- [Custom API](references/methods/custom-api.md): exact-host checks and person approval for an uncatalogued API.
- [Short-lived](references/methods/short-lived.md): only a reviewed provider-specific token integration.
- [Track and rotate](references/methods/track-rotate.md): database URLs and webhook signing secrets stay real on the host.
- Host changes: [Railway](references/hosts/railway.md), [local](references/hosts/local.md), [Docker](references/hosts/docker.md), [Fly](references/hosts/fly.md), [Render](references/hosts/render.md), [Vercel](references/hosts/vercel.md), [Cloudflare](references/hosts/cloudflare.md), [GitHub Actions](references/hosts/github-actions.md), [Netlify](references/hosts/netlify.md), [Heroku](references/hosts/heroku.md).
