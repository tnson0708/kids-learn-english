import { SubjectHeader } from "@/components/subject-header";

export default function MathLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <SubjectHeader subjectId="math" />
      {children}
    </div>
  );
}
