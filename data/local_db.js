const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync(process.env.DB_DIR || 'db.json');
console.log("process.env.DB_DIR", process.env.DB_DIR);
const db = low(adapter);

db.defaults({}).write();

module.exports = db;
