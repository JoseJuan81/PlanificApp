export const HIERARCHY_TASK_FRAGMENT = (gql) => gql`
  fragment hierarchyTaskFields on Task {
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
`;

export const a = null;