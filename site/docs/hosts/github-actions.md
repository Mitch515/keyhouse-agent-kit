# GitHub Actions

There is no connector yet. Record the placement; future rotation needs another GitHub secret write.

Set a repository secret with `gh secret set OPENAI_API_KEY --repo <owner/repo>` and supply the replacement through stdin. Set `OPENAI_BASE_URL` the same way, or use a repository variable for the nonsecret URL. Add `--env <environment>` for an environment secret and preserve that scope in the workflow.

In the workflow step map `OPENAI_API_KEY: ${{ secrets.OPENAI_API_KEY }}` and `OPENAI_BASE_URL: ${{ secrets.OPENAI_BASE_URL }}` under `env`. Change its `run` command to the actual app command. A job can run the future `keyhouse run -- node server.js` after installing the CLI, but the relay is not built yet.

Commit the workflow change through the normal review path. For a workflow supporting `workflow_dispatch`, start it with `gh workflow run <workflow> --repo <owner/repo> --ref <branch>`. This reruns work; it is not a persistent deployment by itself. Confirm its integration step and Keyhouse usage.

Never enable shell tracing, print `env`, echo a secret expression, or rely only on GitHub's masking. Keep secrets out of job artifacts, caches and untrusted pull-request workflows.

Checked 2026-10-23: [gh secret set](https://cli.github.com/manual/gh_secret_set), [gh workflow run](https://cli.github.com/manual/gh_workflow_run), [using Actions secrets](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions).
