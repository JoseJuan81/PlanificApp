import { gql } from '@apollo/client/core';

export const CreateHierarchyTaskMutation = gql`
  mutation createTask($CreateTaskInput: CreateTaskInput) {
    createTask(task: $CreateTaskInput) {
      code
      success
      message
      task {
        id
        name
        budget
        checkList {
          title
          done
        }
        links
      }
    }
  }
`;

export const other = null;
