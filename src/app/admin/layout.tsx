import AdminNavigation from "@/components/adminnav";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row min-h-[100dvh] h-[100dvh] overflow-hidden bg-gray">
      <AdminNavigation />
      <div className="flex-1 p-6 overflow-y-auto">{children}</div>
    </div>
  );
}
