import { Hono } from "hono";
import ExampleCoordinator from "../coordinator/examplecoordinator";

export default function createExampleRouter(coordinator?: ExampleCoordinator) {
  const exampleCoordinator = coordinator || new ExampleCoordinator();
  const router = new Hono();

  router.get("/", async (c) => {
    try {
      const result = await exampleCoordinator.get(c);
      return c.json(result);
    } catch (err: any) {
      return c.text(err.message, 500);
    }
  });

  router.get("/:id", async (c) => {
    try {
      const id = Number.parseInt(c.req.param("id"));
      const example = await exampleCoordinator.getById(c, id);
      return c.json(example);
    } catch (err: any) {
      return c.text(err.message, 404);
    }
  });

  router.post("/", async (c) => {
    try {
      const body = await c.req.json();
      const newExample = await exampleCoordinator.create(c, body);
      return c.json(newExample, 201);
    } catch (err: any) {
      return c.text(err.message, 500);
    }
  });

  router.patch("/:id", async (c) => {
    try {
      const id = Number.parseInt(c.req.param("id"));
      const body = await c.req.json();
      const updatedExample = await exampleCoordinator.update(c, id, body);
      return c.json(updatedExample);
    } catch (err: any) {
      return c.text(err.message, 500);
    }
  });

  router.delete("/:id", async (c) => {
    try {
      const id = Number.parseInt(c.req.param("id"));
      
      const result = await exampleCoordinator.delete(c, id);

      if (result) {
        return c.json(null, 200);
      } 

      return c.text("Not Found", 404);
    } catch (err: any) {
      return c.text(err.message, 500);
    }
  });

  return router;
}
