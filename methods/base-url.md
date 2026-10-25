# Change the base URL

Use this when the SDK accepts a base URL or a hostname. Read its `sdks` entry first: `env` lists variables the SDK reads itself; `configuration` lists variables your application must pass explicitly. Paths differ between SDKs.

For OpenAI, set `OPENAI_API_KEY=<proxy-key>` and `OPENAI_BASE_URL=https://<gateway>/openai/v1`. Keep `new OpenAI()`.

For Anthropic, set `ANTHROPIC_API_KEY=<proxy-key>` and `ANTHROPIC_BASE_URL=https://<gateway>/anthropic`. Its generated requests already include `/v1`. Groq likewise appends `/openai/v1`; set `GROQ_BASE_URL=https://<gateway>/groq`.

For Stripe, use a hostname gateway. Set `STRIPE_SECRET_KEY=<proxy-key>` and `STRIPE_HOST=stripe.<gateway-domain>`. Change construction to `new Stripe(process.env.STRIPE_SECRET_KEY, {host: process.env.STRIPE_HOST})`. Do not put a scheme, port or path in `host`. A local path gateway cannot replace this hostname.

For other SDKs, use the catalogue snippet and its constructor option. Keep each variable on the server, including server-only environment scopes on the host. Never expose a key through a browser build prefix.

Run the application's smallest integration path, then `keyhouse verify`. When `connect.verify` exists, confirm a request for this key, an upstream success and the expected placement. A set variable alone does not prove traffic passed through Keyhouse.

Tell the person which service changed, which gateway it uses and what request proved it. Ask them to rotate the real key that previously lived on the host using the normal rotation authorization.
