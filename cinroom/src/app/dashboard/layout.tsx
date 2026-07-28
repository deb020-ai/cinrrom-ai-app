import { Sidebar } from "@/components/shared/sidebar";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Enforce strict live account protection: Unauthenticated users CANNOT access dashboard
  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-0 lg:ml-64 pt-20 lg:pt-0 min-h-screen">
        <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 pb-32 lg:pb-28">
          {children}
        </div>
      </main>
    </div>
  );
}
