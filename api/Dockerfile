FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build


FROM base as runner
WORKDIR /app
COPY --from=build /app/build /app/build
COPY --from=build /app/prisma /app/prisma
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/package.json /app/package.json

# Expose port 4000
EXPOSE 4000

# Start the application
CMD ["pnpm", "start"]
