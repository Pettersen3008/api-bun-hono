import { pgTable, serial, text, varchar, boolean } from "drizzle-orm/pg-core";

export const todoTable = pgTable("todos", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  completed: boolean("completed").notNull().default(false),
});