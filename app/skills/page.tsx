// app/skills/page.tsx
import SkillsGrid from "@/components/SkillsGrid";

export const metadata = {
  title: "Skills",
  description: "Skills auto-listed from /data/skills JSON files",
};

export default function SkillsPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Skills</h1>
      <SkillsGrid />
    </main>
  );
}
