import { Hono } from "hono";
import TodoCoordinator from "../coordinator/todocoordinator";

export default function createTodoRouter(coordinator?: TodoCoordinator) {
  const todoCoordinator = coordinator || new TodoCoordinator();
  const router = new Hono();

  router.get("/", async (c) => {
    try {
      const result = await todoCoordinator.get(c);
      return c.json(result);
    } catch (err: any) {
      return c.text(err.message, 500);
    }
  });

  router.get("/:id", async (c) => {
    try {
      const id = Number.parseInt(c.req.param("id"));
      const todo = await todoCoordinator.getById(c, id);
      return c.json(todo);
    } catch (err: any) {
      return c.text(err.message, 404);
    }
  });

  router.patch("/:id/completed", async (c) => {
    try {
      const id = Number.parseInt(c.req.param("id"))
      const body = await c.req.json();
      const todo = await todoCoordinator.update(c, id, body);
      return c.json(todo)
    } catch (err: any) {
      return c.text(err.message, 500);
    }
  })

  router.post("/", async (c) => {
    try {
      const body = await c.req.json();
      const newTodo = await todoCoordinator.create(c, body);
      return c.json(newTodo, 201);
    } catch (err: any) {
      return c.text(err.message, 500);
    }
  });

  router.patch("/:id", async (c) => {
    try {
      const id = Number.parseInt(c.req.param("id"));
      const body = await c.req.json();
      const updatedTodo = await todoCoordinator.update(c, id, body);
      return c.json(updatedTodo);
    } catch (err: any) {
      return c.text(err.message, 500);
    }
  });

  router.delete("/:id", async (c) => {
    try {
      const id = Number.parseInt(c.req.param("id"));
      const deleted = await todoCoordinator.delete(c, id);
      if (deleted) return c.json(null, 200);
      return c.text("Not Found", 404);
    } catch (err: any) {
      return c.text(err.message, 500);
    }
  });

  return router;
}
