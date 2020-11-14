import { gql } from '@apollo/client/core';

export const getHierarchyTasks = () => (
  {
    query: gql`
      query getTasks {
        tasks {
          budget {
            amount
            currencyCode
          }
          checkList {
            title
            done
          }
          expenses {
            amount
            currencyCode
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
