FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lock /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

FROM base AS prod
RUN mkdir -p /temp/prod
COPY package.json bun.lock /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

FROM base AS build
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

FROM base AS release
COPY --from=prod /temp/prod/node_modules node_modules
COPY --from=build /usr/src/app .

ENV NODE_ENV=production

USER bun

EXPOSE 3000/tcp

ENTRYPOINT ["bun", "run", "./src/index.ts"]
