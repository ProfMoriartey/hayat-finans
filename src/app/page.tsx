import { Show, SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { Button } from "~/components/ui/button";

export default async function LandingPage() {
  const { sessionClaims } = await auth();
  const isAdmin = sessionClaims?.metadata?.role === "admin";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-sm space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Clinic Accounting
          </h1>
          <p className="text-gray-500">
            Manage your daily revenue and patient records securely
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <Show when="signed-out">
            <SignInButton>
              <Button className="w-full" size="lg">
                Log In
              </Button>
            </SignInButton>
          </Show>

          <Show when="signed-in">
            {isAdmin && (
              <Link href="/admin" className="w-full">
                <Button className="w-full" variant="outline" size="lg">
                  Admin Dashboard
                </Button>
              </Link>
            )}
            <Link href="/dashboard" className="w-full">
              <Button className="w-full" size="lg">
                Staff Dashboard
              </Button>
            </Link>
          </Show>
        </div>
      </div>
    </main>
  );
}
