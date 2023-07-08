const mongoose = require("mongoose");
// const { MongoClient, ServerApiVersion } = require('mongodb');

const connectDb = async () => {
    try {
        console.log("connect to db...with connection string: " + process.env.CONNECTION_STRING);
        // const conn = await mongoose.connect(process.env.CONNECTION_STRING);
        const conn = await mongoose.connect(process.env.CONNECTION_STRING, {
            connectTimeoutMS: 10000,
        });
        //     , { 
        //     useNewUrlParser: true, 
        //     useUnifiedTopology: true,
        //     useCreateIndex: true
        // });  
        console.log(`MongoDB connected: ${conn.connection.host}, ${conn.connection.name}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        // process.exit(1);
    }
};

module.exports = connectDb;