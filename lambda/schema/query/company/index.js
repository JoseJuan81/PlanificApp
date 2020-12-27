import {
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from "graphql";
import { Task } from "../task";
import { User } from "../user";
import { Expense } from "../expense";

export const Company = new GraphQLObjectType({
    name: 'Company',
    fields: () => ({
		expenses: {
			type: new GraphQLNonNull(new GraphQLList(Expense)),
			async resolve(args, { models }) {
				const { ExpenseModel } = models;

				const expenseRequests = [];
				args.expensesId.forEach((e) => {
					expenseRequests.push(ExpenseModel.findById(e));
				});

				const expenses = await Promise.all(expenseRequests);
				return expenses;
			},
		},
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		tasks: {
			type: new GraphQLNonNull(new GraphQLList(Task)),
			async resolve(args, { models }) {
				const { TaskModel } = models;

				const tasksRequests = [];
				args.tasksId.forEach((t) => {
					tasksRequests.push(TaskModel.findById(t));
				});

				const tasks = await Promise.all(tasksRequests);
				return tasks;
			},
		},
		users: {
			type: new GraphQLNonNull(new GraphQLList(User)),
			async resolve(args, { models }) {
				const { UserModel } = models;

				const userRequests = [];
				args.usersId.forEach((u) => {
					userRequests.push(UserModel.findById(u));
				});

				const users = await Promise.all(userRequests);
				return users;
			},
		},
    }),
});
