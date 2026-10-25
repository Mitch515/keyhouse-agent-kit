# Track a secret and rotate it

Use this for database URLs, SMTP passwords, webhook signing secrets and other credentials that cannot be replaced by an HTTP proxy key. The catalogue has explicit `STRIPE_WEBHOOK_SECRET` and `DATABASE_URL` entries.

Keep the real value in the host's secret store. Keep `stripe.webhooks.constructEvent(rawBody, signature, process.env.STRIPE_WEBHOOK_SECRET)` and `new Pool({connectionString: process.env.DATABASE_URL})`. Neither variable becomes a `kh_` value. Do not send database TCP traffic through an HTTP gateway or substitute a fake webhook verification key.

Record the app, variable name, host and rotation procedure as a tracked placement when `connect.apply` supports it. The current CLI recognizes these types during scan but does not upload them as API credentials. Its verify command reports that tracked placement verification is unavailable until the server supports it.

Rotate through the provider using the normal grant or person approval, update every placement and restart or redeploy the app. Railway is the only current host connector. Elsewhere the agent must update the host again; recording a placement does not grant Keyhouse write access.

Verify a real database health request or webhook verification without logging the value. Coordinate signing-secret overlap and database connection recycling using the provider's documented procedure.

Tell the person that the real secret stays on the host and is exposed if the host is breached. State where it is recorded and who will perform the next rotation. Never claim this method gives proxy isolation.
