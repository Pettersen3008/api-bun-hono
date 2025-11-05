import { pgTable, serial, text, varchar, boolean } from "drizzle-orm/pg-core";

export const schema = pgTable("examples", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  completed: boolean("completed").notNull().default(false),
});