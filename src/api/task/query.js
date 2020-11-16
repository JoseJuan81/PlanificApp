import { gql } from '@apollo/client/core';
import { HIERARCHY_TASK_FRAGMENT } from './fragments';

export const getHierarchyTasks = () => (
  {
    query: gql`
      query getTasks {
        tasks {
          ...hierarchyTaskFields
        }
      }
      ${HIERARCHY_TASK_FRAGMENT(gql)}
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
