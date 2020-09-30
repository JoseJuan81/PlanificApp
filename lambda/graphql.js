const { ApolloServer, gql } = require('apollo-server-lambda');

const typeDefs = gql`
  type Query {
    hello: String
    tasks: [Task]!
  }
  type Task {
    asigned: ID
    balance: Float
    budget: Float
    children: [ID]!
    comments: [String]!
    expenses: [ID]!
    flagMaster: Boolean
    flagSimpleTask: Boolean
    id: ID!
    labels: [String]!
    links: [String]!
    name: String
    parentTaskId: ID
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
    PEND
    PROCE
    CANC
    RETRA
  }
  type TaskTime {
    endDate: String
    duration: Float
    initDate: String
  }
  type TaskRelated {
    condition: TaskRelatedConditions
    id: ID
  }
  enum TaskRelatedConditions {
    EE
    ES
    SS
    SE
  }
`;

const resolvers = {
  Query: {
    hello: (parent, args, context) => 'Hello, world!',
    tasks: (parent, args, context) => 'Listado de actividades',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
