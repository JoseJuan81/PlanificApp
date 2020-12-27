import { Schema, model } from 'mongoose';

const PointSchema = new Schema({
	type: {
		type: String,
		enum: ['Point'],
	},
	coordinates: {
		type: [Number],
	}
})

const expenseSchema = new Schema({
	amount: {
		default: 0,
		required: true,
		type: Number,
	},
	billingNumber: {
		default: '',
		type: String,
	},
	companyId: {
		default: '',
		type: String,
	},
	currencyCode: {
		default: '',
		required: true,
		type: String,
	},
	description: {
		default: '',
		type: String,
	},
	location: {
		type: PointSchema,
	},
	image: {
		default: '',
		type: String,
	},
	name: {
		default: '',
		index: true,
		required: true,
		type: String,
	},
	place: {
		default: '',
		type: String,
	},
	relatedTaskId: {
		default: '',
		index: true,
		type: String,
	},
});

const expenseModel = model('expenses', expenseSchema);

export default expenseModel;
