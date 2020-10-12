module.exports.getResolvers = function getResolvers() {
  const resolvers = {
    Query: {
      tasks: async (parent, args, { taskModel }) => {
        const tasks = await taskModel.find();
        return tasks;
      },
    },
    MutationResponse: {
      __resolveType: (mutationResponse) => {
        console.log('mutationResponse', mutationResponse);
        return null;
      },
    },
    Expense: {
      name: (parent, args, context) => {
        console.log('Expense', parent);
        return `Gasto ${parent}`;
      },
    },
    Mutation: {
      createTask: async (_, { task }, { taskModel }) => {
        const response = await taskModel.create(task);
        console.log('response', response);
        return {
          code: 200,
          success: true,
          message: 'Nueva tarea',
          task,
        };
      },
    },
  };
  return resolvers;
};
