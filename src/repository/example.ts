import type { Context } from "hono";
import { db, schema } from "../provider/db";
import { eq } from "drizzle-orm";
import type { ExampleResponse } from "../coordinator/examplecoordinator";

export default class ExampleRepository {
  async get(context: Context): Promise<ExampleResponse[]> {
    return db.select().from(schema);
  }

  async getById(context: Context, id: number): Promise<ExampleResponse | undefined> {
    const result = await db.select().from(schema).where(eq(schema.id, id));
    return result[0] || undefined;
  }

  async create(context: Context, body: Partial<ExampleResponse>): Promise<number> {
    const data = await db.insert(schema).values({
      title: body.title || "",
      description: body.description || "",
      moreDetails: body.moreDetails || "",
    });

    return data.oid
  }

  async update(context: Context, id: number, body: Partial<ExampleResponse>): Promise<void> {
    await db.update(schema).set({
      title: body.title || "",
      description: body.description || "",
      moreDetails: body.moreDetails || "",
    }).where(eq(schema.id, id));
  }

  async delete(context: Context, id: number): Promise<void> {
    await db.delete(schema).where(eq(schema.id, id));
  }
}
