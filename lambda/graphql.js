import { ApolloServer, gql } from 'apollo-server-lambda';
import getTypeDefs from './typeDef';
import getResolvers from './resolvers';
import connectToMongoDB from './mongoDb/mongooseConnection';
import TaskModel from './api/models/taskSchema';
import ExpenseModel from './api/models/expenseSchema';

// exports.handler = async function handler(event, context) {
exports.handler = async function handler() {
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
      formatResponse: (res, req) => {
        console.log('grahqlResponse', res);
        return res;
      },
    });

    return server.createHandler();
    // return new Promise((yay, nay) => {
    //   const cb = (err, args) => (err ? nay(err) : yay(args));
    //   return server.createHandler()(event, context, cb);
    // });
  } catch (error) {
    console.error('Error al conectarse con BD', error);

    return false;
  }
};

// exports.handler = init();
