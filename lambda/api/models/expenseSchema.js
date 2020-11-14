import { Schema, model } from 'mongoose';

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
  currencyCode: {
    default: '',
    required: true,
    type: String,
  },
  description: {
    default: '',
    type: String,
  },
  image: {
    default: '',
    type: String,
  },
  place: {
    default: '',
    type: String,
  },
  title: {
    default: '',
    index: true,
    required: true,
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
