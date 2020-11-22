import { isEmpty } from 'functionallibrary';
import { ApolloError } from 'apollo-server-lambda';
import { getSubTasks, getParentTask } from './subFields';
// import { buildHierarchy } from '../helpers';

export default function getResolvers() {
  const resolvers = {
    Query: {
      tasks: async (parent, args, { models }) => {
        const { TaskModel } = models;
        const tasks = await TaskModel.find();
        return tasks;
      },
      // hierarchyTask: async (paren, args, { models }) => {
      //   const { TaskModel } = models;
      //   const tasks = await TaskModel.find();
      //   return buildHierarchy(tasks);
      // },
    },
    Task: {
      parentTask: getParentTask,
      subTasks: getSubTasks,
    },
    Mutation: {
      createTask: async (_, { task }, { models }) => {
        const { ExpenseModel, TaskModel } = models;
        try {
          const { expenses, ...rest } = task;
          /**
           * Crear tarea en BD
           */
          const taskCreated = await TaskModel.create({ ...rest });
          /**
           * Agregar id de actividad en cada gasto
           * Crear gastos
           */
          let newExpenses = [];
          if (!isEmpty(expenses)) {
            const relatedExpenses = taskCreated.addTaskIdToExpenses(expenses, taskCreated.id);
            try {
              newExpenses = await ExpenseModel.create(relatedExpenses);
            } catch (error) {
              console.log('Error al crear gastos relacionados a un actividad', error);
              return new ApolloError(
                'Error al crear gastos asociados a nueva actividad',
                400,
              );
            }
            /**
             * Actualizar Actividad
            */
            taskCreated.expenses = taskCreated.getExpensesIds(newExpenses);
            taskCreated.spent = taskCreated.calculateTotalSpent(expenses);
          }
          await taskCreated.save();
          return {
            code: 200,
            success: true,
            message: `Tarea: ${taskCreated.name} creada exitosamente`,
            task: taskCreated,
          };
        } catch (error) {
          console.log('error al crear actividad', error);
          return {
            code: 400,
            success: false,
            message: 'Crear Tarea falló',
          };
        }
      },
    },
    MutationResponse: {
      __resolveType: (mutationResponse) => {
        console.log('mutationResponse', mutationResponse);
        return null;
      },
    },
  };
  return resolvers;
}
