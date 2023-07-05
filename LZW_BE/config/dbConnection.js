const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.CONNECTION_STRING);
            // , { 
        //     useNewUrlParser: true, 
        //     useUnifiedTopology: true,
        //     useCreateIndex: true
        // });
        console.log(`MongoDB connected: ${conn.connection.host}, ${conn.connection.name}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDb;