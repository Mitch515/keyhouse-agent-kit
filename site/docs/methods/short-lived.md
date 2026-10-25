# Prefer short-lived credentials when supported

Use this when a provider offers workload identity federation or a token minting flow. It needs a reviewed provider-specific integration; possession of a proxy key does not make a token exchange available.

No general token exchange is implemented by this CLI. Do not invent an endpoint, audience or scope. Until the reviewed integration exists, use the service's base-URL method or report that it cannot be connected yet.

For an implemented exchange, replace the application's long-lived secret read with the provider SDK's credential callback. That callback fetches a token from the reviewed Keyhouse action, caches only until its returned expiry, and refreshes before expiry. Keep `KEYHOUSE_URL` and the scoped application proxy key in server-only configuration; the developer's `kh_agent_` token belongs only in the CLI's private config and never in the deployed app.

Verify a successful request, expiry and renewal using the provider's documented lifetime. Check the audience and scopes, and confirm an expired token is refused. Never print the token as evidence.

Tell the person how long a stolen token would remain usable, which service and scopes it reaches, and whether renewal has actually been demonstrated. Do not claim a long-lived secret has left the host until it has been removed and rotated.
