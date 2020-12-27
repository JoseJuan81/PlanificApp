import {
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
} from "graphql";

import { Task } from './task';
import { Company } from './company';
import { User } from './user';
import { Expense } from './expense';


export const query = new GraphQLObjectType({
	name: 'Query',
	fields: () => ({
		company: {
			type: new GraphQLNonNull(Company),
			async resolve(source, args, { models }) {
				const { CompanyModel } = models;
				const company = await CompanyModel.findById(args.companyId);
				return company;
			},
		},
		expense: {
			type: new GraphQLNonNull(Expense),
			async resolve(source, args, { models }) {
				const { ExpenseModel } = models;
				const task = await ExpenseModel.findById(args.taskId);
				return task;
			},
		},
		expenses: {
			type: new GraphQLNonNull(new GraphQLList(Expense)),
			async resolve(source, args, { models }) {
				const { ExpenseModel } = models;
				const tasks = await ExpenseModel.find();
				return tasks;
			}
		},
		hierarchyTask: {
			type: new GraphQLNonNull(new GraphQLList(Task)),
			async resolve(source, args, { models }) {
				const { TaskModel } = models;
				const hierarchyTasks = await TaskModel.find({ parentTaskId: '' });
				return hierarchyTasks;
			},
		},
		task: {
			type: new GraphQLNonNull(Task),
			async resolve(source, args, { models }) {
				const { TaskModel } = models;
				const task = await TaskModel.findById(args.taskId);
				return task;
			},
		},
		tasks: {
			type: new GraphQLNonNull(new GraphQLList(Task)),
			async resolve(source, args, { models }) {
				const { TaskModel } = models;
				const tasks = await TaskModel.find();
				return tasks;
			}
		},
		user: {
			type: new GraphQLNonNull(User),
			async resolve(source, args, { models }) {
				const { UserModel } = models;
				const user = await UserModel.findById(args.userId);
				return user;
			},
		},
		users: {
			type: new GraphQLNonNull(new GraphQLList(User)),
			async resolve(source, args, { models }) {
				const { UserModel } = models;
				const usersByCompany = UserModel.find({ companyId: args.companyId });
				return usersByCompany;
			},
		},
	}),
})
