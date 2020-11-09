export default function getTypeDefs(gql) {
  const typeDefs = gql`
    type Mutation {
      createTask(task: CreateTaskInput): CreateTaskMutationResponse
    }
    type CreateTaskMutationResponse implements MutationResponse {
      code: String!
      success: Boolean!
      message: String!
      task: Task!
    }
    input CreateTaskInput {
      asigned: String,
      balance: Float,
      budget: Float,
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
      currency: String,
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
