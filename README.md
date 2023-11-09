# Teebay

> Two tier node app communicating via graphql

## Run locally

Start the dev server,

```bash
git clone git@github.com:TusharIbtekar/teebay.git
cd teebay
mv .env.example .env
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

Visit http://localhost:4000/graphql to interact with the graphql interface provided by `apollo`

To stop the dev server,

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml down -v
```

### Run the prod build

```bash
docker compose -f docker-compose.yml -f docker-compose.prod.yml up -d --build   # pass build flag in-case you already have an image built with dev script
```

## Backend

- Node.js
- Express.js
- Typescript
- GraphQL
- Prisma
- Zod

## Database

- PostgreSQL

Initial DB model

![teebay-db](teebay-db.png)

## Frontend

Planned,

- React.js
- Typescript
- Vite
- React-hook-form
- Zod
- TailwindCSS
- Mantine

## Challenges & Solution

- Trying to run Prisma migration with `docker compose` during build time didn't work out! Name resolution of the compose service wasn't working as expected! As a solution for the time being, migrations were moved to the entrypoint of docker container.

### Todos

- [ ] Setup monorepo with shared deps
- [ ] Share ESLint & Prettier config from monorepo
