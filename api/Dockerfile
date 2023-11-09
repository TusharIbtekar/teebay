FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./

ARG NODE_ENV

RUN if [ "$NODE_ENV" = "development" ]; \
    then pnpm install --frozen-lockfile; \
    else pnpm install --prod; \
    fi

COPY . .

RUN pnpm build

FROM base as runner
WORKDIR /app
COPY --from=build /app/build /app/build
COPY --from=build /app/prisma /app/prisma
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json

EXPOSE 4000

CMD ["pnpm", "start"]
