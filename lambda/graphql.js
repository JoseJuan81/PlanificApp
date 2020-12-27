import { ApolloServer } from 'apollo-server-lambda';
import connectToMongoDB from './mongoDb/mongooseConnection';
import TaskModel from './api/models/taskModel';
import ExpenseModel from './api/models/expenseModel';
import CompanyModel from './api/models/companyModel';
import UserModel from './api/models/userModel';
import schema from './schema';

exports.handler = async function handler(event, context) {
	try {
		await connectToMongoDB();

		const server = new ApolloServer({
			schema,
			context: () => ({
				models: {
					CompanyModel,
					ExpenseModel,
					TaskModel,
					UserModel,
				},
			}),
			formatResponse: (res, req) => {
				return res;
			},
		});
		return new Promise((yay, nay) => {
			const cb = (err, args) => (err ? nay(err) : yay(args));
			server.createHandler({
				cors: {
					origin: '*',
				},
			})(event, context, cb);
		});
	} catch (error) {
	console.error('Error al conectarse con BD', error);

	return false;
	}
};
