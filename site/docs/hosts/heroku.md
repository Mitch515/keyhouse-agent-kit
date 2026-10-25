# Heroku

There is no connector. Record the placement; the agent must set replacements again when rotating.

Set `heroku config:set OPENAI_API_KEY=<proxy-key> OPENAI_BASE_URL=<gateway-url> --app <app>`. Capture and discard stdout/stderr because config commands can echo values. Use only the newly issued proxy values in CLI arguments. Existing real secrets should remain in the host secret store and never pass through the agent's output.

Change the Procfile to `web: node server.js` using the app's actual command. Heroku dynos can support a future `web: keyhouse run -- node server.js` when the CLI is installed, but the relay is not built yet.

Config changes create a release and restart dynos. For code or Procfile changes, commit and deploy using `git push heroku HEAD:main` after verifying the remote targets the intended app. A config restart alone does not deploy unpushed code. Exercise the new release's integration and inspect Keyhouse usage.

Never run `heroku config`, `config:get`, shell environment dumps or verbose request logging into agent-visible output. Report release metadata only.

Checked 2026-10-23: [config vars](https://devcenter.heroku.com/articles/config-vars), [Procfile](https://devcenter.heroku.com/articles/procfile), [Git deploy](https://devcenter.heroku.com/articles/git).
