import { gql } from '@apollo/client/core';
import { HIERARCHY_TASK_FRAGMENT, FLATLIST_TASK_FRAGMENT } from './fragments';

export const getHierarchyTasks = () => (
  {
    query: gql`
      query getHierarchyTask {
        hierarchyTask {
          ...hierarchyTaskFields
          subTasks {
            ...hierarchyTaskFields
            subTasks {
              ...hierarchyTaskFields
            }
          }
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
          ...flatListTaskField
        }
      }
      ${FLATLIST_TASK_FRAGMENT(gql)}
    `,
  }
);
