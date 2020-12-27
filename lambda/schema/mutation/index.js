import { GraphQLObjectType } from "graphql";
import { CreateTaskResponse } from "./task/response";
import { getCreateTask } from './task';
import { CreateTaskInput } from './task/inputs';

export const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        createTask: {
            type: CreateTaskResponse,
            args: {
                task: { type: CreateTaskInput },
            },
            resolve: async (source, { task }, { models }) => await getCreateTask(source, { task }, { models }),
        },
    },
});