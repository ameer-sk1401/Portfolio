// components/ProjectsGrid.tsx
import fs from "node:fs";
import path from "node:path";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

type Project = {
  repo: string;
  owner: string;
  html_url: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  updated_at: string;
  summary_title: string;
  summary_blurb: string;
  summary_bullets: string[];
  topics?: string[];
};

function readProjects(): Project[] {
  const dir = path.join(process.cwd(), "data", "projects");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"));
  const items: Project[] = [];
  for (const f of files) {
    try {
      const obj = JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8"));
      items.push(obj);
    } catch {}
  }
  // newest first by updated_at
  return items.sort((a, b) => (b.updated_at || "").localeCompare(a.updated_at || ""));
}

export default function ProjectsGrid() {
  const projects = readProjects();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {projects.map((p) => (
        <a key={p.html_url} href={p.html_url} target="_blank" rel="noreferrer">
          <Card className="p-6 hover:shadow-xl transition-shadow h-full flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl font-semibold">{p.summary_title || p.repo}</h3>
                <ArrowUpRight className="w-5 h-5 shrink-0" />
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.summary_blurb || p.description}</p>
              {p.summary_bullets && p.summary_bullets.length > 0 && (
                <ul className="mt-3 list-disc ml-5 text-sm space-y-1">
                  {p.summary_bullets.slice(0,3).map((b, idx) => <li key={idx}>{b}</li>)}
                </ul>
              )}
            </div>
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              {p.language && <Badge>{p.language}</Badge>}
              {Array.isArray(p.topics) && p.topics.slice(0, 4).map(t => (
                <Badge key={t} variant="secondary">{t}</Badge>
              ))}
              <span className="text-xs text-muted-foreground ml-auto">
                ★ {p.stars} • Forks {p.forks}
              </span>
            </div>
          </Card>
        </a>
      ))}
    </div>
  );
}
