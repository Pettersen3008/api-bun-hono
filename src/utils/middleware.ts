import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';
import { etag } from 'hono/etag';
import { jwk } from 'hono/jwk';
import config from "../provider/config";
import { licenseHandler } from './licenseHandler';


export const commonMiddlewares = [
  logger(),
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'x-tfso-license'],
    exposeHeaders: ['Content-Length', 'X-Request-Id'],
    maxAge: 3600,
    credentials: true
  }),
  secureHeaders(),
  etag(),
  jwk({ jwks_uri: config.JWKS }),
  licenseHandler,
];
