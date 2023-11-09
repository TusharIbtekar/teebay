import { ApolloServer } from "@apollo/server";
import { User } from "./user";

async function createGraphqlServer() {
  const server = new ApolloServer({
    typeDefs: `
            ${User.typeDefs}
            type Query{
                ${User.quries}
            }
            type Mutation{
                ${User.mutations}
            }
        `,
    resolvers: {
      Query: {
        ...User.resolvers.quries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });

  await server.start();

  return server;
}

export default createGraphqlServer;
