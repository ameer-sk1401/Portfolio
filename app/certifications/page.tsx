// app/certifications/page.tsx
import CertificationsGrid from "@/components/CertificationsGrid";

export const metadata = {
  title: "Certifications",
  description: "Certifications auto-listed from /data/certifications JSON files",
};

export default function CertificationsPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Certifications</h1>
      <CertificationsGrid />
    </main>
  );
}
