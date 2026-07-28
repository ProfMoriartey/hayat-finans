import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core"

export const dailyEntries = pgTable("daily_entries", {
  id: serial("id").primaryKey(),
  userId: text("user_id").notNull(),
  entryData: jsonb("entry_data").notNull().$type<Record<string, unknown>>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
})