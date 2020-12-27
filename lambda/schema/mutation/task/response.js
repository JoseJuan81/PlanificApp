import { GraphQLBoolean, GraphQLInt, GraphQLObjectType, GraphQLScalarType, GraphQLString } from "graphql";
import { Task } from '../../query/task';

export const CreateTaskResponse = new GraphQLObjectType({
    name: 'CreateTaskResponse',
    fields: {
        code: { type: GraphQLInt },
        success: { type: GraphQLBoolean },
        message: { type: GraphQLString },
        task: { type: Task },
    }
});
