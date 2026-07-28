"use server"

import { gte, desc } from "drizzle-orm"
import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"
import { db } from "~/server/db"
import { dailyEntries } from "~/server/db/schema"

export async function createEntry(data: Record<string, unknown>) {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  await db.insert(dailyEntries).values({
    userId,
    entryData: data,
  })

  revalidatePath("/dashboard")
}

export async function getTodayEntries() {
  const { userId } = await auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  return db
    .select()
    .from(dailyEntries)
    .where(gte(dailyEntries.createdAt, today))
    .orderBy(desc(dailyEntries.createdAt))
}