const dotenv = require("dotenv")
dotenv.config();

const express = require('express');
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const cors = require("cors");
const router = express.Router();
const serverless = require('serverless-http');

app.use(
  cors({
    origin: "*",
  })
);
const port = process.env.PORT || 3000;

console.log("express project");
console.log("connect to db");
connectDb();
app.use(express.json());
app.use("/LZW", require("./routes/LZW_Routes"));
app.use(errorHandler)
app.use('./netlify/functions/server', router);
module.exports.handler = serverless(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})