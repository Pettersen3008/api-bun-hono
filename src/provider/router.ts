import { Hono } from "hono";
import createTodoRouter from "../router/todo";

const router = new Hono().basePath('/api/v1');

router.route("/todos", createTodoRouter());

export default router;
