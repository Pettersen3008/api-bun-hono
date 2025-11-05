import { Hono } from "hono";
import { commonMiddlewares } from "./utils/middleware";
import router from "./provider/router";
import { errorHandler } from "./utils/errorHandler";
import createHealthzRouter from "./router/healthzRouter";

const app = new Hono();
app.route("/healthz", createHealthzRouter());

for (const mw of commonMiddlewares) {
  app.use('*', mw);
}

app.onError(errorHandler);

app.route("/", router);

export default {
  port: Number(process.env.PORT) || 3000,
  fetch: app.fetch
}