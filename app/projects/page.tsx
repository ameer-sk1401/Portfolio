// app/projects/page.tsx
import ProjectsGrid from "@/components/ProjectsGrid";

export const metadata = {
  title: "Projects",
  description: "Automatically synced from your GitHub READMEs",
};

export default function ProjectsPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Projects</h1>
      <ProjectsGrid />
    </main>
  );
}
