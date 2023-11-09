# teebay - api

## Run locally

```bash
git clone git@github.com:TusharIbtekar/teebay.git
docker compose up -d    # to spin db
cd api
pnpm i                  # install deps
mv .env.example .env    # copy .env file
npx prisma generate  # apply db migrations
pnm dev
```

Visit http://localhost:4000/graphql to interact with the graphql interface provided by `apollo`
