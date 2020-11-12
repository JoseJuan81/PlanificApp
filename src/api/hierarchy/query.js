import { gql } from '@apollo/client/core';

export const getHierarchyTasks = () => (
  {
    query: gql`
      query getTasks {
        tasks {
          budget
          checkList {
            title
            done
          }
          expenses {
            amount
            currency
          }
          id
          labels
          name
          spent
        }
      }
    `,
  }
);

export const getHierarchyTaskDetails = () => (
  {
    query: gql`
      query taskDetails {
        name
      }
    `,
  }
);

export const getFlatListTasks = () => (
  {
    query: gql`
      query getTasks {
        tasks {
          id
          name
        }
      }
    `,
  }
);
