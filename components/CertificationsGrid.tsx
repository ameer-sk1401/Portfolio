// components/CertificationsGrid.tsx
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight } from "lucide-react";

type Cert = {
  name: string;
  issuer: string;
  issue_date?: string;
  expire_date?: string;
  credential_id?: string;
  credential_url?: string;
  logo?: string;
  logoSvg?: string;
  skills?: string[];
};

function readCerts(): Cert[] {
  const dir = path.join(process.cwd(), "data", "certifications");
  if (!fs.existsSync(dir)) return [];
  const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"));
  const items: Cert[] = [];
  for (const f of files) {
    try {
      items.push(JSON.parse(fs.readFileSync(path.join(dir, f), "utf-8")));
    } catch {}
  }
  return items.sort((a,b)=> (b.issue_date||"").localeCompare(a.issue_date||""));
}

export default function CertificationsGrid() {
  const certs = readCerts();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {certs.map((c) => (
        <Card key={c.name + c.issuer} className="p-6 flex gap-4">
          <div className="w-14 h-14 shrink-0 rounded-xl bg-muted/40 flex items-center justify-center overflow-hidden">
            {c.logo ? (
              <Image src={c.logo} alt={c.name} width={56} height={56} />
            ) : c.logoSvg ? (
              <div className="w-14 h-14" aria-label={`${c.name} logo`} dangerouslySetInnerHTML={{ __html: c.logoSvg }} />
            ) : null}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold leading-tight">{c.name}</h3>
                <p className="text-sm text-muted-foreground">{c.issuer}</p>
              </div>
              {c.credential_url && (
                <a href={c.credential_url} target="_blank" rel="noreferrer" className="opacity-80 hover:opacity-100">
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              )}
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {c.issue_date && <span>Issued {c.issue_date}</span>}
              {c.expire_date && <span> • Expires {c.expire_date}</span>}
              {c.credential_id && <span> • ID {c.credential_id}</span>}
            </div>
            {Array.isArray(c.skills) && c.skills.length > 0 && (
              <div className="mt-3 flex gap-2 flex-wrap">
                {c.skills.slice(0,5).map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
}
