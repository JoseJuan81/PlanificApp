import mongoose from 'mongoose';

require('dotenv').config();

const uri = process.env.MONGO_CONNECTION;

let cachedDb = null;

export default () => {
	if (cachedDb && cachedDb.connection.readyState === 1) {
		return Promise.resolve(cachedDb);
	}
	const dbOptions = {
		useUnifiedTopology: true,
		useNewUrlParser: true,
		autoIndex: false,
	};
	const DB = mongoose.connect(uri, dbOptions);
	return DB
		.then((dbClient) => {
			cachedDb = dbClient;
			return cachedDb;
		});
};
