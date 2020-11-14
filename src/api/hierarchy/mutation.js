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
        budget {
          amount
        }
        checkList {
          title
          done
        }
        labels
        links
      }
    }
  }
`;

export const other = null;
