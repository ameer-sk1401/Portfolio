// components/SkillsGrid.tsx
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Skill = {
  name: string;
  logo?: string;
  logoSvg?: string;
  tags?: string[];
  since?: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
};

function readSkills(): Skill[] {
  const dir = path.join(process.cwd(), "data", "skills");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"));
  const items: Skill[] = [];
  for (const f of files) {
    try {
      items.push(JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")));
    } catch {}
  }
  return items.sort((a,b)=> (b.since||"").localeCompare(a.since||""));
}

export default function SkillsGrid() {
  const skills = readSkills();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {skills.map((s) => (
        <Card key={s.name} className="p-5 flex items-center gap-4">
          <div className="w-12 h-12 shrink-0 rounded-xl bg-muted/40 flex items-center justify-center overflow-hidden">
            {s.logo ? (
              <Image src={s.logo} alt={s.name} width={48} height={48} />
            ) : s.logoSvg ? (
              <div className="w-12 h-12" aria-label={`${s.name} logo`} dangerouslySetInnerHTML={{ __html: s.logoSvg }} />
            ) : null}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold truncate">{s.name}</h3>
              {s.level && <Badge variant="secondary" className="text-xs">{s.level}</Badge>}
              {s.since && <span className="text-xs text-muted-foreground">since {s.since}</span>}
            </div>
            {Array.isArray(s.tags) && s.tags.length > 0 && (
              <div className="mt-2 flex gap-2 flex-wrap">
                {s.tags.slice(0,5).map(t => <Badge key={t}>{t}</Badge>)}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
