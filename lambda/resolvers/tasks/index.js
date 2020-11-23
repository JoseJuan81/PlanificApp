import { getCreateTask, getUpdateTask, getHardDeleteTask } from './mutation';
import {
  getSubTasks, getParentTask, getTasks, getTask, getHierarchyTask,
} from './query';

export default function getResolvers() {
  const resolvers = {
    Query: {
      task: getTask,
      tasks: getTasks,
      hierarchyTask: getHierarchyTask,
    },
    Task: {
      parentTask: getParentTask,
      subTasks: getSubTasks,
    },
    Mutation: {
      createTask: getCreateTask,
      hardDeleteTask: getHardDeleteTask,
      updateTask: getUpdateTask,
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
