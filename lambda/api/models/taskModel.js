import { Schema, model } from 'mongoose';
import { map, reduce, round, setNewProperty, isEmpty, filter, equality } from 'functionallibrary';

const twoDecimals = round(2);

const RelatedTask = new Schema({
	condition: String,
	id: String,
});

const taskSchema = new Schema({
	assignedId: {
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
	companyId: {
		default: '',
		type: String,
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
	userId: {
		default: '',
		index: true,
		type: String,
	},
}, { timestamps: true });

/* Campos virtuales */
taskSchema.virtual('balance').get(function calculateBalance() {
	if (this.budget && this.budget.amount > 0) {
		return twoDecimals(this.spent / this.budget.amount);
	}
	return 0;
});

taskSchema.virtual('flagSimpleTask').get(function flagSimpleTask() {
	return isEmpty(this.subTaks);
});

taskSchema.virtual('progress').get(function progress() {
	const done = filter(equality('done', true), this.checkList);
	return {
		done,
		total: this.checkList.length,
	};
});

/* Métodos */

/**
 * @param {array} expenses - arreglo de gastos 
 * @return {number} spent - gasto total
 */
taskSchema.methods.calculateTotalSpent = (expenses) => {
	const sumExpenses = (total, expense) => total + (expense.amount || 0);
	return reduce(sumExpenses, 0, expenses);
};
/**
 * @param {array} expenses - arreglo de gastos
 * @param {string} taskId - id de actividad 
 * @return {array} expenses - arreglo de gastos con actividad relacionada
 */
taskSchema.methods.addTaskIdToExpenses = function addTaskId(expenses, taskId) {
	const addRelatedTaskId = setNewProperty('relatedTaskId', taskId);
	return map(addRelatedTaskId, expenses);
};

/**
 * @param {array} expenses - arreglo de gastos
 * @return {array} ids - arreglo de id de gastos
 */
taskSchema.methods.getExpensesIds = function getExpensesIds(expenses) {
	const getId = (expense) => expense.get('id');
	return map(getId, expenses);
};

const taskModel = model('task', taskSchema);

export default taskModel;
