export default function getMutation(gql) {
  const typeDefs = gql`
    type Mutation {
      createTask(task: CreateTaskInput): CreateTaskMutationResponse
      softDeleteTask(id: ID!): HardDeleteTaskMutationResponse
      hardDeleteTask(id: ID!): HardDeleteTaskMutationResponse
      updateTask(task: UpdateTaskInput): UpdateTaskMutationResponse
    }
    type UpdateTaskMutationResponse implements MutationResponse {
      code: String!
      success: Boolean!
      message: String!
      task: Task!
    }
    type CreateTaskMutationResponse implements MutationResponse {
      code: String!
      success: Boolean!
      message: String!
      task: Task!
    }
    type HardDeleteTaskMutationResponse {
      code: String!
      success: Boolean!
      message: String!
      task: Task!
    }
    input UpdateTaskInput {
      asigned: String,
      balance: Float,
      budget: BudgetInput,
      checkList: [CheckListInput]
      children: [String],
      comments: [String],
      expenses: [ExpenseTaskInput],
      flagMaster: Boolean,
      flagSimpleTask: Boolean,
      id: ID!
      labels: [String],
      links: [String],
      name: String,
      parentTask: String,
      progress: ProgressTaskInput,
      relatedTasks: [RelatedTaskInput],
      spent: Float,
      status: String,
      subTasks: [String],
      time: TimeTaskInput,
    }
    input CreateTaskInput {
      asigned: String,
      balance: Float,
      budget: BudgetInput,
      checkList: [CheckListInput]
      children: [String],
      comments: [String],
      expenses: [ExpenseTaskInput],
      flagMaster: Boolean,
      flagSimpleTask: Boolean,
      labels: [String],
      links: [String],
      name: String!,
      parentTask: String,
      progress: ProgressTaskInput,
      relatedTasks: [RelatedTaskInput],
      spent: Float,
      status: String,
      subTasks: [String],
      time: TimeTaskInput,
    }
    input BudgetInput {
      amount: Float
      currencyCode: String
    }
    input CheckListInput {
      done: Boolean
      title: String
    }
    input ProgressTaskInput {
      done: Float,
      total: Float,
    }
    input RelatedTaskInput {
      condition: String,
      taskId: String,
    }
    input TimeTaskInput {
      endDate: String,
      duration: Float,
      initDate: String,
    }
    input ExpenseTaskInput {
      amount: Float,
      currencyCode: String,
      title: String,
    }
    interface MutationResponse {
      code: String!
      success: Boolean!
      message: String!
    }
  `;
  return typeDefs;
}
