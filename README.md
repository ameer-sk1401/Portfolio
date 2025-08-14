# 👋 Hi, I'm Ameer Shaik

**AWS Cloud Engineer | DevOps & Data Engineering Enthusiast | M.S. in Computer Science @ SUNY Binghamton**

I design, build, and automate cloud-native solutions that make infrastructure **scalable, cost-efficient, and reliable**.  
My expertise spans **AWS, DevOps automation, and data engineering pipelines** — combining engineering precision with a drive to solve real-world problems.

💡 This portfolio is a **self-hosted, live-updating profile** powered by GitHub Actions CI/CD and Netlify.  
Whenever I push a new project or earn a new skill, it **automatically updates** — no manual edits needed.

---

## 🎯 Career Focus

- **Primary Goal** → Cloud Engineering & DevOps roles, leveraging AWS to design resilient, automated systems.
- **Secondary Goal** → AI/Data Engineering roles combining cloud infrastructure with data pipelines and analytics.
- **Long-Term Vision** → Build large-scale, cost-optimized, intelligent cloud systems that power global applications.

---

## 🛠 Skills & Technologies

**Cloud Platforms & Services**  
- AWS (EC2, S3, RDS, Lambda, IAM, VPC, CloudFormation, Athena, Redshift, Glue, QuickSight)
- ServiceNow CRM Development

**DevOps & Automation**  
- Terraform | Ansible | Jenkins | GitHub Actions | Docker | CI/CD Pipelines

**Programming & Data**  
- Python Automation | SQL | Node.js
- Data Engineering: ETL pipelines, real-time streaming, analytics dashboards

**Other Tools & Practices**  
- Networking Fundamentals | Linux | Git | REST APIs | Agile/Scrum

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

