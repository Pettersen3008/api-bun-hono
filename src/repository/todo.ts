import type { Context } from "hono";
import { db, todoTable } from "../provider/db";
import { eq } from "drizzle-orm";
import type { Todo } from "../coordinator/todocoordinator";

export default class TodoRepository {
  async get(context: Context): Promise<Todo[]> {
    return db.select().from(todoTable)
  }

  async getById(context: Context, id: number): Promise<Todo | undefined> {
    const result = await db.select().from(todoTable).where(eq(todoTable.id, id));
    return result[0] || undefined;
  }

  async create(context: Context, body: Partial<Todo>): Promise<number> {
    const data = await db.insert(todoTable).values({
      title: body.title || "",
      description: body.description || "",
      completed: Boolean(body.completed) || false,
    }).returning()

    return data[0].id
  }

  async update(context: Context, id: number, body: Todo): Promise<number> {
    const newId = await db.update(todoTable).set({
      title: body.title,
      description: body.description,
      completed: body.completed,
    }).where(eq(todoTable.id, id)).returning()

    return newId[0].id
  }

  async delete(context: Context, id: number): Promise<void> {
    await db.delete(todoTable).where(eq(todoTable.id, id));
  }
}
