export default function getTypeDefs(gql) {
  const typeDefs = gql`
    extend type Query {
      tasks: [Task]!
      hierarchyTask: [Task]!
    }
    type Task {
      asigned: ID
      balance: Float
      budget: Budget
      checkList: [CheckList]!
      children: [Task]!
      comments: [String]!
      expenses: [Expense]!
      flagSimpleTask: Boolean
      id: ID!
      labels: [String]!
      links: [String]!
      name: String
      parentTask: Task
      progress: TaskProgress
      relatedTask: [TaskRelated]!
      spent: Float
      status: TaskStatus
      subTasks: [Task]!
      time: TaskTime
    }
    type CheckList {
      done: Boolean
      title: String
    }
    type TaskProgress {
      done: Int
      total: Int
    }
    type TaskTime {
      endDate: String
      duration: Float
      initDate: String
    }
    type TaskRelated {
      condition: TaskRelatedConditions
      task: Task
    }
    enum TaskStatus {
      CANCELADO
      EJECUCION
      FIN
      PENDIENTE
      RETRASADO
    }
    enum TaskRelatedConditions {
      EE
      ES
      SS
      SE
    }
    type Budget {
      amount: Float
      currencyCode: String
    }
  `;
  return typeDefs;
}
