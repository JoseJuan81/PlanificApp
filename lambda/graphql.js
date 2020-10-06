require('dotenv').config();

const { ApolloServer, gql } = require('apollo-server-lambda');
const { getTypeDefs } = require('./typeDef/task');
const { getResolvers } = require('./resolvers/tasks');
const connectToMongoDB = require('./mongoDb/taskDbConnection');

exports.handler = async function (event, context) {
  const db = await connectToMongoDB();
  const typeDefs = getTypeDefs(gql);
  const resolvers = getResolvers(db);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  return new Promise((yay, nay) => {
    const cb = (err, args) => (err ? nay(err) : yay(args));
    server.createHandler()(event, context, cb);
  });
};
