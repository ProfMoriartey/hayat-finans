import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { SidebarNav } from "./sidebar-nav";

export async function Navbar() {
  const { userId, sessionClaims } = await auth();

  if (!userId) {
    return null;
  }

  const isAdmin = sessionClaims?.metadata?.role === "admin";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <SidebarNav isAdmin={isAdmin} />
          <span className="hidden text-lg font-semibold sm:block">
            Clinic Accounting
          </span>
        </div>

        <div>
          <UserButton />
        </div>
      </div>
    </header>
  );
}
