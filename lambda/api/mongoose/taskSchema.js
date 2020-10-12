import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  budget: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    default: '',
  },
});

const taskModel = new model('Task', taskSchema);

export default taskModel;
