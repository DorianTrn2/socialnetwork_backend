const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = "social_network_dtvh";
const client = new MongoClient(url);
let db;

async function maindb(){
    await client.connect();
    console.log(`Connected successfully to MongoDB server: ${url}`);
    console.log(`Connecting to database: ${dbName}`);
    db = client.db(dbName);
}
const Database={
    getDb: async function (){
        if(db == undefined){
            await maindb();
        }
        return db;
    }   
}

maindb()
    .then()
    .catch(console.error);

module.exports = Database;
