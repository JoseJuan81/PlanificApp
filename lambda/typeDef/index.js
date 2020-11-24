import TaskTypeDefs from './task';
import ExpenseTypeDefs from './expense';
import TaskMutations from './taskMutation';

export default (gql) => [
  ExpenseTypeDefs(gql),
  TaskTypeDefs(gql),
  TaskMutations(gql),
];
