import {
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from "graphql";
import { multipleRequestsByIds } from "../../helper";

import { Company } from '../company';
import { Expense } from "../expense";
import { Task } from '../task';

export const User = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        avatar: { type: GraphQLString },
        age: { type: GraphQLInt },
        company: {
            type: Company,
            async resolve(args, { models }) {
                const { CompanyModel } = models;
                const company = await CompanyModel.findById(args.companyId);
                return company;
            },
        },
        expenses: {
            type: new GraphQLNonNull(new GraphQLList(Expense)),
            async resolve(args, { models }) {
                const { ExpenseModel } = models;
                const expenseRequests = multipleRequestsByIds(ExpenseModel, args.expensesId);
                const expenses = await Promise.all(expenseRequests);
                return expenses;
            },
        },
        flagActive: { type: GraphQLBoolean },
        gender: { type: GraphQLString },
        id: { type: GraphQLString },
        lastname: { type: GraphQLString },
        name: { type: GraphQLString },
        role: { type: GraphQLString },
        tasks: {
            type: new GraphQLNonNull(new GraphQLList(Task)),
            async resolve(args, { models }) {
                const { TaskModel } = models;
                const taskRequests = multipleRequestsByIds(TaskModel, args.tasksId);
                const tasks = await Promise.all(taskRequests);
                return tasks;
            },
        },
    }),
});