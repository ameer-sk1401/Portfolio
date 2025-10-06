// scripts/sync.js
// Usage:
//   node scripts/sync.js
// Required env:
//   - GH_TOKEN: a PAT with repo:read/public_repo
//   - PORTFOLIO_GH_USER: GitHub username to read repos from
// Optional:
//   - INCLUDE_TOPICS: "true" to include GitHub topics
//   - MAX_REPOS: "50" to limit scanned repos
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GH_TOKEN = process.env.GH_TOKEN;
const USER = process.env.PORTFOLIO_GH_USER;
if (!GH_TOKEN || !USER) {
  console.error("Missing GH_TOKEN or PORTFOLIO_GH_USER");
  process.exit(1);
}

const BASE = "https://api.github.com";
const headers = {
  "Authorization": `Bearer ${GH_TOKEN}`,
  "Accept": "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28"
};

const projectsDir = path.join(__dirname, "..", "data", "projects");
fs.mkdirSync(projectsDir, { recursive: true });

function slugify(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

function summarizeMarkdown(md) {
  const lines = md.split(/\r?\n/);
  const bullets = [];
  let firstPara = "";
  let foundPara = false;
  let title = "";

  for (const lineRaw of lines) {
    const line = lineRaw.trim();
    if (!title && line.startsWith("#")) {
      title = line.replace(/^#+\s*/, "").trim();
    }
    if (!foundPara && line && !line.startsWith("#") && !line.startsWith(">")) {
      firstPara = line;
      foundPara = true;
    }
    if (line.startsWith("- ") || line.startsWith("* ")) {
      bullets.push(line.replace(/^[-*]\s+/, ""));
    }
  }

  function words(s, n=60) {
    return s.split(/\s+/).filter(Boolean).slice(0, n).join(" ");
  }

  return {
    title,
    blurb: firstPara ? words(firstPara, 60) : "",
    bullets: bullets.slice(0, 3)
  };
}

async function gh(url) {
  const res = await fetch(url, { headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${res.status} for ${url}: ${text}`);
  }
  return res.json();
}

function decodeBase64(b64) {
  return Buffer.from(b64 || "", "base64").toString("utf-8");
}

async function main() {
  const per_page = 100;
  let page = 1;
  let all = [];
  const maxRepos = process.env.MAX_REPOS ? parseInt(process.env.MAX_REPOS, 10) : Infinity;

  while (true) {
    const url = `${BASE}/users/${USER}/repos?per_page=${per_page}&page=${page}&sort=updated`;
    const chunk = await gh(url);
    all = all.concat(chunk);
    if (chunk.length < per_page || all.length >= maxRepos) break;
    page++;
  }
  if (Number.isFinite(maxRepos)) {
    all = all.slice(0, maxRepos);
  }

  for (const repo of all) {
    if (repo.fork || repo.archived) continue;

    const fname = path.join(projectsDir, `${slugify(repo.name)}.json`);
    if (fs.existsSync(fname)) {
      // append-only: keep existing entry
      continue;
    }
    let readmeText = "";
    try {
      const readme = await gh(`${BASE}/repos/${repo.owner.login}/${repo.name}/readme`);
      readmeText = decodeBase64(readme.content);
    } catch {
      // repo without README
    }
    const summary = summarizeMarkdown(readmeText || "");

    let topics = [];
    if (process.env.INCLUDE_TOPICS === "true") {
      try {
        const t = await gh(`${BASE}/repos/${repo.owner.login}/${repo.name}/topics`);
        topics = Array.isArray(t.names) ? t.names : [];
      } catch {}
    }

    const payload = {
      repo: repo.name,
      owner: repo.owner.login,
      html_url: repo.html_url,
      description: repo.description || "",
      language: repo.language || "",
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      updated_at: repo.updated_at,
      summary_title: summary.title || repo.name,
      summary_blurb: summary.blurb,
      summary_bullets: summary.bullets,
      topics,
      created_at: new Date().toISOString()
    };

    fs.writeFileSync(fname, JSON.stringify(payload, null, 2));
    console.log("Added project:", fname);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
