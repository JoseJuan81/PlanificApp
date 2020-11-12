import TaskTypeDefs from './task';
import ExpenseTypeDefs from './expense';
import Mutations from './mutation';

export default (gql) => [
  ExpenseTypeDefs(gql),
  TaskTypeDefs(gql),
  Mutations(gql),
];
