const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(process.env.DB_DIR || 'db.json');
const db = low(adapter);

db.defaults({}).write();

module.exports = db;
