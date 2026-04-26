// app/(main)/layout.tsx
import NavBar from "@/components/navBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
}
