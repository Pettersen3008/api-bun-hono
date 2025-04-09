import { Context } from "hono";

export function errorHandler(err: Error, c: Context) {
  const errorId = crypto.randomUUID();
  
  console.error(`[Error - ${errorId}] ${err.message}`);
  console.error(err.stack);

  const response = process.env.NODE_ENV === 'production'
    ? { error: { message: 'Internal Server Error', id: errorId } }
    : { error: { message: err.message, stack: err.stack } };

  return c.json(response, 500);
}
