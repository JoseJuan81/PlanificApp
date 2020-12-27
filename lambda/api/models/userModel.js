import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    avatar: {
        default: '',
        type: String,
    },
    age: {
        default: 0,
        type: Number,
    },
    companyId: {
        default: '',
        type: String,
    },
    flagActive: {
        default: true,
        type: Boolean,
    },
    gender: {
        default: '',
        enum: ['male', 'female'],
        type: String,
    },
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
    role: {
        default: '',
        type: String,
    },
    tasksId: {
        default: [],
        type: [String],
    },
})

const userModel = model('users', userSchema)

export default userModel;
