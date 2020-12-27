import { GraphQLBoolean, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from "graphql";
import { Expense } from '../expense';
import { User } from '../user';
import { Company } from '../company';
import { multipleRequestsByIds } from "../../helper";

export const TaskBudget = new GraphQLObjectType({
	name: 'TaskBudget',
	fields: {
		amount: { type: GraphQLFloat },
		currencyCode: { type: GraphQLString },
	},
})

export const TaskCheckList = new GraphQLObjectType({
	name: 'TaskCheckList',
	fields: {
		done: { type: GraphQLBoolean },
		title: { type: GraphQLString },
	},
});

export const TaskProgress = new GraphQLObjectType({
	name: 'TaskProgress',
	fields: {
		done: { type: GraphQLInt },
		total: { type: GraphQLInt },
	},
});

export const TaskTime = new GraphQLObjectType({
	name: 'TaskTime',
	fields: {
		endDate: { type: GraphQLString },
		duration: { type: GraphQLFloat },
		initDate: { type: GraphQLString },
	}
});

export const Task = new GraphQLObjectType({
	name: 'Task',
	fields: () => ({
		asigned: {
			type: new GraphQLNonNull(User),
			async resolve(args, { models }) {
				const { UserModel }	= models;
				const user = await UserModel.findById(args.asignedId);
				return user;
			},
		},
		balance: { type: new GraphQLNonNull(GraphQLFloat) },
		budget: { type: new GraphQLNonNull(TaskBudget) },
		checkList: { type: new GraphQLNonNull(new GraphQLList(TaskCheckList)) },
		comments: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) },
		company: {
			type: new GraphQLNonNull(Company),
			async resolve(args, { models }) {
				const { CompanyModel } = models;
				const companyData = await CompanyModel.findById(args.companyId);
				return companyData;
			},
		},
		expenses: { type: new GraphQLNonNull(new GraphQLList(Expense)) },
		flagSimpleTask: { type: GraphQLBoolean },
		id: { type: GraphQLString },
		labels: { type: new GraphQLList(GraphQLString) }, 
		links: { type: new GraphQLList(GraphQLString) },
		name: { type: GraphQLString },
		parentTask: {
			type: Task,
			async resolve(source, args, { models }) {
				const { TaskModel } = models;
				const task = await TaskModel.findById(source.parentTaskId);
				return task;
			},
		},
		progress: { type: TaskProgress },
		relatedTask: {
			type: new GraphQLList(Task),
			async resolve(source, args, { models }) {
				const { TaskModel } = models;
				const requests = [];
				
				source.relatedTask.forEach((r) => {
					requests.push(TaskModel.findById(r.id));
				});

				const res = await Promise.all(requests);
				return res;
			}
		},	
		spent: { type: GraphQLFloat },
		status: { type: GraphQLString },
		subTasks: {
			type: new GraphQLList(Task),
			async resolve(source, args, { models }) {
				const { TaskModel } = models;
				const requests = multipleRequestsByIds(TaskModel, source.subTasks);
				const res = await Promise.all(requests);
				return res;
			},
		},
		time: { type: TaskTime },
	})
});
