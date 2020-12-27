import { Schema, model } from 'mongoose';

const companySchema = new Schema({
    expensesId: {
        default: [],
        type: [String],
    },
    id: {
        default: '',
        type: String,
    },
    name: {
        default: '',
        type: String,
    },
    tasksId: {
        default: [],
        type: [String],
    },
    usersId: {
        default: [],
        type: [String],
    },
})

const companyModel = model('company', companySchema)

export default companyModel;