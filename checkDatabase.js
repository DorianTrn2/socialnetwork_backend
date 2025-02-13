const mongoose = require('mongoose');
const exec = require('child_process').exec;

const mongoHost = process.env.DOCKER ? 'mongo' : 'localhost';
const mongoPort = process.env.MONGO_PORT || '27017';
const mongoURL = `mongodb://${mongoHost}:${mongoPort}/${process.env.DATABASE_NAME}`;

async function checkDatabase() {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000
        });

        const collections = await mongoose.connection.db.listCollections().toArray();
        if (collections.length === 0) {
            console.log("Database is empty, initializing...");
            exec('npm run initDB', (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error initializing database: ${error}`);
                    process.exit(1);
                }
                console.log(stdout);
                console.error(stderr);
                process.exit(0);
            });
        } else {
            console.log("Database is already initialized.");
            process.exit(0);
        }
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

checkDatabase();