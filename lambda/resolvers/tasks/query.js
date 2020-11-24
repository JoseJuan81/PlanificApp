import { buildHierarchy } from '../../helpers';

export const getSubTasks = async (parent, args, { models }) => {
  const { TaskModel } = models;
  const ids = parent.subTasks;

  if (ids.length > 0) {
    const requests = [];

    ids.forEach((id) => {
      requests.push(TaskModel.findById(id));
    });

    const subTasks = await Promise.all(requests);
    return subTasks;
  }
  return [];
};

export const getParentTask = async (parent, args, { models }) => {
  const { TaskModel } = models;
  const { parentTaskId } = parent;

  if (parentTaskId) {
    const parentTask = await TaskModel.findById(parentTaskId);
    return parentTask;
  }

  return '';
};

export const getTasks = async (parent, args, { models }) => {
  const { TaskModel } = models;
  const tasks = await TaskModel.find();
  return tasks;
};

export const getTask = async (parent, { id }, { models }) => {
  const { TaskModel } = models;
  const tasks = await TaskModel.findById(id);
  return tasks;
};

export const getHierarchyTask = async (paren, args, { models }) => {
  const { TaskModel } = models;
  const tasks = await TaskModel.find();
  return buildHierarchy(tasks);
};
