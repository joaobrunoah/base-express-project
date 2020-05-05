const initializeDatabase = require('../database/initializeDatabase');

module.exports = async () => {
  await initializeDatabase.clearDatabase();
};