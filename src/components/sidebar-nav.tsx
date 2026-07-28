"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, LayoutDashboard, ShieldCheck } from "lucide-react";
import { buttonVariants } from "~/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

export function SidebarNav({ isAdmin }: { isAdmin: boolean }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={buttonVariants({ variant: "ghost", size: "icon" })}
      >
        <Menu className="h-6 w-6 text-gray-700" />
        <span className="sr-only">Toggle navigation menu</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-62.5 p-6 sm:w-75">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-left text-xl font-bold">Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-2">
          <Link
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-black"
          >
            <LayoutDashboard className="h-5 w-5" />
            Staff Dashboard
          </Link>
          {isAdmin && (
            <Link
              href="/admin"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors hover:bg-gray-100 hover:text-black"
            >
              <ShieldCheck className="h-5 w-5" />
              Admin Dashboard
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
