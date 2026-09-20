import { SubjectHeader } from "@/components/subject-header";

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-1 flex-col">
      <SubjectHeader subjectId="english" />
      {children}
    </div>
  );
}
