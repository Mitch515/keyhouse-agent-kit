# Connect an uncatalogued API

Use this when the service has no catalogue entry. Discover the hostname from code and variable names with `keyhouse scan --json`. Never inspect or paste the real value into a model prompt.

Before any credential goes there, call `destinations.check` for the exact host when that action is available. A person must approve an unknown destination. During signup the destination may be part of the account-creation page. Follow its approval result; an agent cannot change the allowed host or approve it itself.

For a raw HTTP client, add an application variable such as `ACME_CRM_BASE_URL` and use `fetch(process.env.ACME_CRM_BASE_URL + '/v2/contacts', {headers: {'X-Api-Key': process.env.ACME_CRM_API_KEY}})`. Set the base URL without a trailing slash to the approved destination gateway and the key to the returned `kh_` key. Preserve the API's actual path and header, query or Basic auth format. Path/body credentials require explicit destination opt-in; signing recipes require catalogue review.

For values the automatic classifier cannot recognize, stop and report the missing classification. Never guess that one provider's shape belongs to another. The current CLI imports catalogue API credentials only; the unknown-destination workflow and `connect.*` arrive in follow-up work.

Exercise the application's integration path after approval, then confirm Keyhouse usage and the exact approved upstream hostname. A refused destination must receive no credential.

Tell the person the exact host to approve and what the key will permit. Report pending approval or unavailable server actions honestly, and carry on only with independent approved services.
