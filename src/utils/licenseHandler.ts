import { createMiddleware } from 'hono/factory'

export const licenseHandler = createMiddleware(async (c, next) => {
  const license = c.req.header('x-tfso-license');
  
  if (!license) {
    return c.json({ error: 'Missing x-tfso-license header' }, 401);
  }

  await next();

  c.set('x-tfso-license', license)
});
