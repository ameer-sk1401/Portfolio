// scripts/sync.mjs
import fs from "fs";
import path from "path";
import fetch from "node-fetch";

const GH_USER = process.env.PORTFOLIO_GH_USER || "ameer-sk1401";
const GH_TOKEN = process.env.GH_TOKEN; // stored in GitHub Secrets
const PROJECTS_DIR = path.join(process.cwd(), "data", "projects");

// Helper: ensure directory exists
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Heuristic summarizer: extracts first meaningful paragraph
function summarizeReadme(content) {
  if (!content) return "";

  // Remove markdown headers, code blocks, images, badges
  let clean = content
    .replace(/!\[.*?\]\(.*?\)/g, "") // images
    .replace(/```[\s\S]*?```/g, "") // code fences
    .replace(/#+\s.*/g, "") // headers
    .replace(/\[.*?\]\(.*?\)/g, (m) => m.match(/\[(.*?)\]/)?.[1] || "") // links
    .replace(/<[^>]+>/g, "") // html tags
    .replace(/\r?\n|\r/g, "\n");

  // Split into paragraphs
  const paragraphs = clean
    .split("\n\n")
    .map((p) => p.trim())
    .filter((p) => p.length > 40 && !p.toLowerCase().startsWith("installation"));

  return paragraphs.length > 0
    ? paragraphs[0].slice(0, 800) // limit length
    : clean.slice(0, 500);
}

// Fetch list of repos
async function fetchRepos() {
  const res = await fetch(`https://api.github.com/users/${GH_USER}/repos?per_page=100`, {
    headers: { Authorization: `token ${GH_TOKEN}` },
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch repos: ${res.status}`);
  }
  return res.json();
}

// Fetch .portfolio.json file
async function fetchTokenFile(repo) {
  const url = `https://raw.githubusercontent.com/${GH_USER}/${repo.name}/main/.portfolio.json`;
  const res = await fetch(url, {
    headers: { Authorization: `token ${GH_TOKEN}` },
  });
  if (res.ok) {
    return await res.json();
  }
  return null;
}

// Fetch README.md
async function fetchReadme(repo) {
  const url = `https://raw.githubusercontent.com/${GH_USER}/${repo.name}/main/README.md`;
  const res = await fetch(url, {
    headers: { Authorization: `token ${GH_TOKEN}` },
  });
  if (res.ok) {
    return await res.text();
  }
  return "";
}

// Sync projects
async function syncProjects() {
  ensureDir(PROJECTS_DIR);

  const repos = await fetchRepos();
  for (const repo of repos) {
    try {
      const tokenData = await fetchTokenFile(repo);
      const filePath = path.join(PROJECTS_DIR, `${repo.name}.json`);

      if (tokenData) {
        const readme = await fetchReadme(repo);
        const summary = summarizeReadme(readme);

        const projectData = {
          repo: repo.name,
          title: tokenData.title || repo.name,
          description: tokenData.description || summary,
          techStack: tokenData.techStack || [],
          demo: tokenData.demo || null,
          github: tokenData.github || repo.html_url,
          lastUpdated: repo.pushed_at,
        };

        const newContent = JSON.stringify(projectData, null, 2);
        const oldContent = fs.existsSync(filePath)
          ? fs.readFileSync(filePath, "utf-8")
          : null;

        if (newContent !== oldContent) {
          fs.writeFileSync(filePath, newContent);
          console.log(`✅ Updated: ${repo.name}`);
        } else {
          console.log(`⏩ Skipped (no change): ${repo.name}`);
        }
      } else {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          console.log(`🗑 Removed: ${repo.name} (no token file)`);
        }
      }
    } catch (err) {
      console.error(`❌ Error processing ${repo.name}:`, err.message);
    }
  }
}

await syncProjects();
