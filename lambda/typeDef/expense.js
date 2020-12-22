export default function getTypeDefs(gql) {
  const typeDefs = gql`
    type Query {
      expenses: [Expense]!
    }

    type Expense {
      amount: Float
      billingNumber: String
      currencyCode: String
      description: String
      image: String
      place: String
      name: String
      relatedTaskId: Task
    }
  `;
  return typeDefs;
}
