const { MongoClient } = require('mongodb');

const args = process.argv.slice(2);
const url = args[0] ?? 'mongodb://localhost:27017';
const dbName = args[1] ?? "social_network_dtvh";
const client = new MongoClient(url);