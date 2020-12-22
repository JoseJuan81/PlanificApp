import { Schema, model } from 'mongoose';
import { map, reduce, round, setNewProperty, isEmpty } from 'functionallibrary';

const twoDecimals = round(2);

const RelatedTask = new Schema({
	condition: String,
	id: String,
});

const taskSchema = new Schema({
	asigned: {
		default: '',
		type: String,
	},
	budget: {
		amount: {
			default: 0,
			type: Number,
		},
		currencyCode: {
			default: 'PEN',
			type: String,
		},
	},
	checkList: {
		default: [],
		type: [{
			done: Boolean,
			title: String,
		}],
	},
	comments: {
		default: [],
		type: [String],
	},
	expenses: {
		default: [],
		type: [String],
	},
	labels: {
		default: [],
		index: true,
		type: [String],
	},
	links: {
		default: [],
		type: [String],
	},
	name: {
		default: '',
		index: true,
		required: true,
		type: String,
		unique: true,
	},
	parentTaskId: {
		default: '',
		index: true,
		type: String,
	},
	progress: {
		type: {
			done: Number,
			total: Number,
		},
		default: {
			done: 0,
			total: 0,
		},
	},
	relatedTask: {
		type: [RelatedTask],
		default: [],
	},
	spent: {
		type: Number,
		default: 0,
	},
	subTasks: {
		default: [],
		index: true,
		type: [String],
	},
	status: {
		type: String,
		default: 'PENDIENTE',
	},
	time: {
		endDate: {
			type: String,
			default: '',
		},
		duration: {
			type: Number,
			default: 0,
		},
		initDate: {
			type: String,
			default: '',
		},
	},
}, { timestamps: true });

/* Campos virtuales */
taskSchema.virtual('balance').get(function calculateBalance() {
	if (this.budget && this.budget > 0) {
		return twoDecimals(this.spent / this.budget);
	}
	return 0;
});

taskSchema.virtual('flagSimpleTask').get(function flagSimpleTask() {
	return isEmpty(this.subTaks);
});

/* Métodos */
taskSchema.methods.calculateTotalSpent = (expenses) => {
	const sumExpenses = (total, expense) => total + (expense.amount || 0);
	return reduce(sumExpenses, 0, expenses);
};

taskSchema.methods.addTaskIdToExpenses = function addTaskId(expenses, taskId) {
	const addRelatedTaskId = setNewProperty('relatedTaskId', taskId);
	return map(addRelatedTaskId, expenses);
};

taskSchema.methods.getExpensesIds = function getExpensesIds(expenses) {
	const getId = (expense) => expense.get('id');
	return map(getId, expenses);
};

const taskModel = model('task', taskSchema);

export default taskModel;
