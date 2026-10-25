# Run through a local relay

Use this for a client that honors proxy variables but lacks a usable base URL, on a host with a long-running start command. It does not work inside Vercel or Netlify functions or Cloudflare Workers.

Change the start command to `keyhouse run -- node server.js`, replacing `node server.js` with the application's actual command. Replace the application's API credential with its Keyhouse proxy key. Keep public account identifiers such as `TWILIO_ACCOUNT_SID`. Load those environment variables before starting the command.

In `keyhouse.json`, map the app's API services under `services`, for example `{"variable":"TWILIO_AUTH_TOKEN","provider":"twilio"}`. Run `keyhouse init` or `keyhouse login` first. The CLI discovers the gateway origin through that authenticated saved connection and pins it in private CLI config. It prints the chosen gateway origin at startup. A differing `KEYHOUSE_PROXY_URL` or project `proxyUrl` is refused. Use `keyhouse run --replace -- <command>` only when you intend to replace the saved gateway with that reviewed origin. The gateway address has no provider path and differs from the dashboard `baseUrl`. HTTPS is required except on loopback, using the same trusted-origin rules as init and login.

Catalogue hosts come from these service mappings. For an approved custom destination, use `d-<publicId>` as its provider. The CLI checks the server's destination metadata using its saved connection before starting; an unapproved or revoked destination is refused. All runs require the saved CLI connection at startup. Tracked database and webhook secrets are not intercepted.

The relay listens only on `127.0.0.1`, using a random port and a new 128-bit password per run. Its proxy URL contains this credential; every HTTP or CONNECT proxy request requires it and missing or incorrect credentials receive 407. Treat the child's proxy environment as private. It sets `HTTP_PROXY`, `HTTPS_PROXY`, `NODE_USE_ENV_PROXY=1`, `NODE_EXTRA_CA_CERTS`, `SSL_CERT_FILE`, `REQUESTS_CA_BUNDLE` and `TWILIO_CA_BUNDLE` for the command. Twilio Node reads `HTTP_PROXY`; setting only `HTTPS_PROXY` does not route that SDK. The relay preserves inherited `NO_PROXY` entries and adds loopback names, removing entries that match registered services, including broad suffixes and wildcards. Both uppercase and lowercase proxy variables are set.

Every start creates a fresh CA whose signing key stays non-exportable in memory. X.509 constraints permit only registered DNS names, exclude their subdomains and exclude IP addresses. Overlapping parent/child host registrations are refused. The CA and leaves are valid for one year; restart commands that run longer. A private temporary directory contains only a public trust bundle, retaining Node public roots, system roots and inherited public CA bundles. Normal exit or a handled signal removes it. A forced kill or machine failure can leave the public file behind, but no CA signing key. Never install a global CA or weaken TLS verification.

For registered hosts on port 443, the relay terminates TLS and forwards to the gateway's provider or destination path. Proxy keys stay placeholders until the gateway swaps them. Other CONNECT streams pass directly to their target without TLS inspection. One trailing dot is removed before host lookup. Registered hosts on other ports are refused. Plain HTTP requests to unregistered hosts are forwarded with their method, path, body and end-to-end headers; registered hosts are refused over plaintext HTTP so a placeholder cannot leak. The command stays attached to its terminal. The wrapper forwards termination signals to the child pid and mirrors its exit status.

Verify with the application's smallest harmless integration request, then check Keyhouse usage for the same service. Confirm unrelated HTTPS still presents its original server certificate and that stopping the command removes its temporary trust file. Node 24's HTTPS client and Twilio's Basic `AccountSid:AuthToken` request shape are covered by the relay journey. Node, Python and Go certificate verification are checked separately; that does not establish every Python or Go HTTP library's proxy behavior. Java and certificate-pinning clients need their own integration; prefer a base URL when available.

Twilio's account auth token also signs inbound webhooks. Prefer a Twilio API key and secret for outbound calls, leaving webhook verification tracked separately.

On macOS, Go may use the system Security framework instead of `SSL_CERT_FILE`, so the temporary bundle alone may not establish trust for Go clients there. Prefer a base URL for that case; never install this per-run CA globally. The Linux certificate rail requires Python and Go in CI and checks DNS, wildcard and IP forgeries.

Known follow-ups:

- Only Twilio's catalogue host `api.twilio.com` is registered. Product hosts such as `verify.twilio.com`, `conversations.twilio.com` and `lookups.twilio.com` need explicit catalogue registration before relay use.
- Windows `.cmd` command spawning is unsupported. Use a directly executable command; Windows process and terminal behavior is not verified.
- Twilio's declared Basic slot currently permits a placeholder beyond the password position. The gateway still sends the real token only to `api.twilio.com`; narrowing the slot to the password is a separate follow-up.
