# Live Portfolio: CI/CD + Auto-Projects/Skills/Certs

## What was added
- `scripts/sync.js` – reads your GitHub repos, summarizes READMEs, writes **new** entries to `data/projects/` (append-only).
- `.github/workflows/portfolio-sync.yml` – runs sync, commits new entries, builds, deploys to Netlify.
- `scripts/dispatch-workflow-template.yml` – template workflow for *other* repos to notify this portfolio via `repository_dispatch`.
- Pages:
  - `/projects` from `data/projects/*.json`
  - `/skills` from `data/skills/*.json`
  - `/certifications` from `data/certifications/*.json`
- `netlify.toml` – Next.js adapter plugin + Node setup.

## Setup (once)
1. **Netlify site**
   - Create a new Netlify site (empty site is fine).
   - Copy **Site ID** (Site settings → General → Site details).
   - Create **Personal access token** in Netlify (User settings → Applications → New access token).

2. **GitHub → Portfolio repo → Settings → Secrets and variables → Actions**
   - **Secrets:**
     - `GH_TOKEN` – GitHub PAT with:
       - `public_repo` *(public repos only)* or `repo` *(if you also want to index private repos)*.
     - `NETLIFY_AUTH_TOKEN` – your Netlify PAT.
     - `NETLIFY_SITE_ID` – site ID from Netlify.
   - **Variables:**
     - `PORTFOLIO_GH_USER` – your GitHub username.

3. **Other project repos (optional, to auto-notify this portfolio)**
   - Add **Secret**: `PORTFOLIO_NOTIFY_TOKEN` – PAT with `public_repo` or `repo` (must have access to the portfolio repo).
   - Add **Variables**:
     - `PORTFOLIO_OWNER` – e.g., `your-username`
     - `PORTFOLIO_REPO` – e.g., `your-username/portfolio-repo`
   - Create `.github/workflows/notify-portfolio.yml` using `scripts/dispatch-workflow-template.yml` from this repo.

4. **Dependencies (one-time)**
   - Ensure `lucide-react` exists: `pnpm add lucide-react`
   - Install Netlify Next plugin: `pnpm add -D @netlify/plugin-nextjs`

## Run it
- Push this repo to GitHub.
- In the **Actions** tab, run **Portfolio Sync & Deploy (Netlify)** → `Run workflow` to test.
- Or wait for a push in any linked project repo to trigger `repository_dispatch`.

## Adding content (append-only)
- **Projects** – auto-generated: one file per repo under `data/projects/`. Delete a file to re-generate it on next sync.
- **Skills** – add a file under `data/skills/<slug>.json`:
  ```json
  { "name":"AWS","logo":"/images/aws.png","tags":["Cloud","EC2"],"since":"2023-02-01","level":"advanced" }
  ```
  - Instead of `logo`, you can embed an inline `logoSvg` string.
- **Certifications** – add a file under `data/certifications/<slug>.json`:
  ```json
  { "name":"AWS SAA","issuer":"AWS","issue_date":"2025-05-10","credential_url":"https://...","logo":"/images/aws-saa.png" }
  ```

## Notes
- The workflow has `permissions: contents: write` to allow committing generated files.
- `scripts/sync.js` uses Node 18+ global `fetch`. If you use Node 16 locally, run with Node 18.
- Rate limits: default GitHub token limits apply; with a PAT you have higher limits.
