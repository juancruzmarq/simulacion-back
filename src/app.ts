import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { PingResolver } from "./resolvers/Ping";
import { ClienteResolver } from "./resolvers/ClienteResolver";
import { UsuarioResolver } from "./resolvers/UsuarioResolver";

export async function startServer() {
  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UsuarioResolver, ClienteResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app, path: "/graphql" });

  return app;
}
