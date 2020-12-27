import {
	GraphQLFloat,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from "graphql";
import { GeoPosition } from '../../commons';
import { Task } from '../task';
import { multipleRequestsByIds } from '../../helper';
import { Company } from "../company";

 export const Expense = new GraphQLObjectType({
	name: 'Expense',
	fields: () => ({
		amount: { type: new GraphQLNonNull(GraphQLFloat) },
		billingNumber: { type: GraphQLString },
		company: {
			type: Company,
			async resolve(args, { models }) {
				const { CompanyModel } = models;
				const company = await CompanyModel.findById(args.companyId);
				return company;
			},
		},
		currencyCode: { type: GraphQLString },
		description: { type: GraphQLString },
		location: { type: GeoPosition },
		image: { type: GraphQLString },
		name: { type: GraphQLString },
		place: { type: GraphQLString },
		relatedTasks: {
			type: new GraphQLNonNull(new GraphQLList(Task)),
			async resolve(args, { models }) {
				const { TaskModel } = models;
				const tasksRequests = multipleRequestsByIds(TaskModel, args.relatedTaskId);
				const tasks = await Promise.all(tasksRequests);
				return tasks;
			},
		},
	}),
 });