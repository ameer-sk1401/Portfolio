# 👋 Hi, I'm Ameer Shaik

**Cloud Engineer | DevOps & Data Engineering Enthusiast | AWS Certified (in progress)**

Welcome to my **Live Portfolio** — a self-hosted, auto-updating showcase of my work, skills, and certifications.  
Every time I push a new project or earn a new skill, this site updates itself automatically through **GitHub Actions CI/CD** and deploys to **Netlify**.

---

## 🖥 About This Portfolio

This portfolio is more than a static website — it’s a **live profile**:

- **Projects** → Automatically pulled from my GitHub repos. The system reads each README, generates a summary, and creates a new project card without overwriting older entries.
- **Skills** → Stored as JSON files with logos/SVGs, organized and displayed in a clean grid.
- **Certifications** → Listed with issuer, dates, credential IDs, and verification links.
- **Append-Only** → Each new addition becomes part of the archive — my journey in tech is documented over time.

---

## 🚀 Features

- **Live Sync** — New repos trigger portfolio updates via `repository_dispatch` events.
- **CI/CD** — GitHub Actions workflow builds and deploys to Netlify automatically.
- **Modern Stack**
  - Next.js 14
  - TypeScript
  - Tailwind CSS
  - shadcn/ui + Radix UI
  - Lucide Icons
- **Responsive UI** — Optimized for desktop and mobile.

---

## 🛠 Tech Stack

    | Category          | Tools & Technologies |
    |-------------------|----------------------|
    | Frontend          | Next.js 14, React, TypeScript |
    | Styling           | Tailwind CSS, shadcn/ui, Radix UI |
    | Icons             | Lucide React Icons |
    | CI/CD             | GitHub Actions, Netlify |
    | Automation        | Node.js, GitHub REST API |
    | Package Manager   | pnpm |
    | Extras            | PostCSS |

---

## 📂 Project Structure (Highlights)

      portfolio-replica/
      ├─ app/                # Next.js app directory
      │  ├─ projects/        # Auto-generated project page
      │  ├─ skills/          # Skills page
      │  └─ certifications/  # Certifications page
      ├─ components/         # UI components & grids
      ├─ data/
      │  ├─ projects/        # JSON files per project
      │  ├─ skills/          # JSON files per skill
      │  └─ certifications/  # JSON files per cert
      ├─ scripts/
      │  ├─ sync.js          # Auto-fetch GitHub repos & READMEs
      │  └─ dispatch-workflow-template.yml
      ├─ .github/workflows/  # CI/CD workflows
      └─ netlify.toml        # Netlify build config

---

## ⚙️ How It Works

1. **Sync Script (`scripts/sync.js`)**  
   Uses GitHub API to fetch my public repositories, summarize their README files, and create JSON data files.

2. **CI/CD Workflow (`portfolio-sync.yml`)**  
   - Runs on:
     - Manual trigger
     - Daily schedule
     - Push to any linked project repo
   - Commits new project data to the repo
   - Builds the site
   - Deploys to Netlify

3. **Netlify**  
   Serves the latest build instantly after every update.

---

## 📬 Contact Me

- **LinkedIn**: [linkedin.com/in/ameershaik](https://www.linkedin.com/in/ameer-shaik-087791218/)
- **GitHub**: [github.com/ameershaik](https://github.com/ameer-sk1401/)

---

> 💡 This portfolio evolves with me — check back often to see my latest projects, skills, and milestones.

