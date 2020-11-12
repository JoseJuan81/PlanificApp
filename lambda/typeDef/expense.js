export default function getTypeDefs(gql) {
  const typeDefs = gql`
    type Query {
      expenses: [Expense]!
    }

    type Expense {
      amount: Float
      billingNumber: String
      currency: String
      description: String
      image: String
      place: String
      title: String
      relatedTaskId: Task
    }
  `;
  return typeDefs;
}
