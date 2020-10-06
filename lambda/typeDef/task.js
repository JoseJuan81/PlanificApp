module.exports.getTypeDefs = function getTypeDefs(gql) {
  const typeDefs = gql`
    type Query {
        hello: String
        tasks: [Task]!
    }
    type Task {
        asigned: ID
        balance: Float
        budget: Float
        children: [Task]!
        comments: [String]!
        expenses: [Expense]!
        flagMaster: Boolean
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
        time: TaskTime
    }
    type TaskProgress {
        done: Int
        total: Int
    }
    enum TaskStatus {
        FIN
        PENDIENTE
        EJECUCION
        CANCELADO
        RETRASADO
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
    enum TaskRelatedConditions {
        EE
        ES
        SS
        SE
    }
    type Expense {
        amount: Float
        billingNumber: String
        description: String
        image: String
        name: String
        place: String
    }
  `;
  return typeDefs;
}