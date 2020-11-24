import { equality, findIndex } from 'functionallibrary';

const getSubTasksUpdated = () => {};

const recursiveTaskUpdate = (task, copy) => {
  const { id, parentTaskId } = task;
  const currentIndex = findIndex(equality('id', id), copy);
  if (currentIndex > -1) {
    if (parentTaskId) {
      const parentIndex = findIndex(equality('id', parentTaskId), copy);
      const [parentTask] = copy.splice(parentIndex, 1);
      const { subTasks } = parentTask;
      if (subTasks.length > 0) {
        parentTask.subTasks = getSubTasksUpdated(subTasks, copy);
      }
      // verificar si el padre tiene parentId
      recursiveTaskUpdate(parentTask, copy);
      return parentTask;
    }
    const [currentTask] = copy.splice(currentIndex, 1);
    const { subTasks: currentSubTasks } = currentTask;
    if (currentSubTasks.length > 0) {
      currentTask.subTasks = getSubTasksUpdated(currentSubTasks, copy);
    }
    return currentTask;
  }
  return false;
};

export const buildHierarchy = (tasks) => {
  const copy = [...tasks];
  const len = copy.length;
  const result = [];

  for (let i = 0; i < len; i += 1) {
    const hierrarchyTask = recursiveTaskUpdate(tasks[i], copy);
    if (hierrarchyTask) {
      result(hierrarchyTask);
    }
  }
};

export const a = null;
