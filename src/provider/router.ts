import { Hono } from "hono";
import createExampleRouter from "../router/example";

const router = new Hono().basePath('/v1');

router.route("/examples", createExampleRouter());

export default router;
