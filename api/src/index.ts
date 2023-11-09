import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createGraphqlServer from "./graphql";

const PORT = Number(process.env.PORT) || 4000;

async function startServer() {
  const app = express();

  app.use(express.json());

  app.use("/graphql", expressMiddleware(await createGraphqlServer()));

  app.listen({ port: PORT }, () => {
    console.log(`🚀 Server ready at http://localhost:4000`);
  });
}

startServer();
