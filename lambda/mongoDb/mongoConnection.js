const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_CONNECTION;

let cachedDb = null;

module.exports = () => {
  if (cachedDb && cachedDb.serverConfig.isConnected()) {
    return Promise.resolve(cachedDb);
  }
  return MongoClient.connect(uri, { useNewUrlParser: true })
    .then((client) => {
      cachedDb = client.db('Task');
      return cachedDb;
    });
};
