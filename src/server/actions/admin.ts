"use server"

import { eq, desc } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"
import { db } from "~/server/db"
import { dailyEntries } from "~/server/db/schema"

export async function getAllEntries() {
  const { userId, sessionClaims } = await auth()

  if (!userId || sessionClaims?.metadata?.role !== "admin") {
    throw new Error("Unauthorized")
  }

  return db
    .select()
    .from(dailyEntries)
    .orderBy(desc(dailyEntries.createdAt))
}

export async function updateEntry(id: number, data: Record<string, unknown>) {
  const { userId, sessionClaims } = await auth()

  if (!userId || sessionClaims?.metadata?.role !== "admin") {
    throw new Error("Unauthorized")
  }

  await db
    .update(dailyEntries)
    .set({
      entryData: data,
      updatedAt: new Date(),
    })
    .where(eq(dailyEntries.id, id))

  revalidatePath("/admin")
}