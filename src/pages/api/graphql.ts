// /src/pages/api/graphql.ts
import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import allowCors from 'src/lib/cros';
import { schema } from '../../../prisma/scheme';
import { prisma } from '../../../prisma/context';

const server = new ApolloServer({
  schema,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req) => ({ req, prisma }),
});

export default allowCors(handler); // <-- apply the middleware
