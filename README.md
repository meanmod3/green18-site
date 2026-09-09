# internal-console

The gated operator console, kept OFF `main` on purpose.

GitHub Pages publishes every file on `main` with no authentication layer, so
anything there is world-readable regardless of what Azure is configured to
require. These files therefore live on their own branch, which Pages does not
serve, and `.github/workflows/azure-swa.yml` fetches them into the deploy
artifact so they exist only on Azure Static Web Apps — where the
`/internal/*` route requires the `operator` role.

Do not merge this branch into `main`.
