import { ApolloServer, gql } from 'apollo-server-lambda';
import { getTypeDefs } from './typeDef/task';
import { getResolvers } from './resolvers/tasks';
import connectToMongoDB from './mongoDb/mongooseConnection';
import taskModel from './api/mongoose/taskSchema';

require('dotenv').config();
// const connectToMongoDB = require('./mongoDb/mongoConnection');

exports.handler = async function (event, context) {
  const db = await connectToMongoDB();
  const typeDefs = getTypeDefs(gql);
  const resolvers = getResolvers(db);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: (req) => {
      return {
        taskModel,
      }
    },
  });

  return new Promise((yay, nay) => {
    const cb = (err, args) => (err ? nay(err) : yay(args));
    server.createHandler()(event, context, cb);
  });
};
