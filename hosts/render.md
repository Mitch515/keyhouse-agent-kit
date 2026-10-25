# Render

There is no Keyhouse connector. Record the placement; the agent must update Render again when a key rotates.

Use the service's Environment page, add or edit `OPENAI_API_KEY` and `OPENAI_BASE_URL`, then choose Save, rebuild, and deploy. For a scripted update, `PUT https://api.render.com/v1/services/<service-id>/env-vars/<key>` changes one variable with a JSON `value` body. Pass authorization and value from a local process without printing either; discard the response.

Do not use the collection `PUT /services/<id>/env-vars` for a single update: it replaces the entire variable list and deletes omitted variables. Never dump the existing list into an agent to reconstruct it.

Change Start Command in Settings, or `startCommand` in the Blueprint. A web service or worker can run the future `keyhouse run -- node server.js`; the relay is not built yet. Static sites and functions cannot host that persistent relay.

For an API update, trigger a deployment with `POST https://api.render.com/v1/services/<service-id>/deploys` and body `{}`. Variable API writes alone do not deploy. Use a local HTTP script with secret headers excluded from logs. Verify the deployed service's integration and Keyhouse usage.

Checked 2026-10-23: [environment setup](https://render.com/docs/configure-environment-variables), [single-variable API](https://api-docs.render.com/reference/update-env-var), [collection replacement warning](https://api-docs.render.com/reference/update-env-vars-for-service), [deploy API](https://api-docs.render.com/reference/create-deploy), [startCommand](https://render.com/docs/blueprint-spec).
