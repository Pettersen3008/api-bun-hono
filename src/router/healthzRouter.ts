import { Hono } from "hono";

export default function createHealthzRouter() {
  const router = new Hono();
  
  router.get("/", (c) =>
    c.json(
      {
        status: "ok",
        message: "Saul Goodman"
      },
      200
    )
  );

  return router;
}