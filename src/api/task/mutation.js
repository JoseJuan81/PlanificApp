import { gql } from '@apollo/client/core';
import { HIERARCHY_TASK_FRAGMENT } from './fragments';

export const CreateHierarchyTaskMutation = gql`
  mutation createTask($CreateTaskInput: CreateTaskInput) {
    createTask(task: $CreateTaskInput) {
      code
      success
      message
      task {
        ...hierarchyTaskFields
      }
    }
  }
  ${HIERARCHY_TASK_FRAGMENT(gql)}
`;

export const other = null;
