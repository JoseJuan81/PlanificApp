import { ApolloServer, gql } from 'apollo-server-lambda';
import getTypeDefs from './typeDef';
import getResolvers from './resolvers';
import connectToMongoDB from './mongoDb/mongooseConnection';
import TaskModel from './api/models/taskSchema';
import ExpenseModel from './api/models/expenseSchema';

exports.handler = async function handler(event, context) {
  try {
    await connectToMongoDB();

    const typeDefs = getTypeDefs(gql);
    const resolvers = getResolvers;

    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: () => ({
        models: {
          ExpenseModel,
          TaskModel,
        },
      }),
    });

    return new Promise((yay, nay) => {
      const cb = (err, args) => (err ? nay(err) : yay(args));
      server.createHandler({
        cors: {
          origin: '*',
        },
      })(event, context, cb);
    });
  } catch (error) {
    console.error('Error al conectarse con BD', error);

    return false;
  }
};
