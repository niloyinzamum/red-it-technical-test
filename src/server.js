const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const jwt = require('jsonwebtoken');
const { GraphQLScalarType } = require('graphql');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const { authenticate } = require('./utils/auth');

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SAMPLE;
console.log(JWT_SECRET);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (formattedErr) => ({
    message: formattedErr.message,
    code: formattedErr.extensions?.code || 'INTERNAL_ERROR',
    path: formattedErr.path,
  }),
  context: ({ req }) => {
    const token = req.headers.authorization?.replace('Bearer ', '');    
    const user = authenticate(token);    
    return { user };
  },
});

async function startServer() {
  try {
    const { url } = await startStandaloneServer(server, {
      listen: { port: 4000 },
      context: async ({ req }) => {
        const token = req.headers.authorization?.replace('Bearer ', '');       
        const user = authenticate(token); 
        return { user };
      },
    });
    console.log(`🚀 GraphQL Server ready at: ${url}`);
  } catch (error) {
    console.error('Error starting server:', error);
  }
}

startServer();