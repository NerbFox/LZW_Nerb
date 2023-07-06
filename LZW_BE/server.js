const dotenv = require("dotenv")
dotenv.config();

const express = require('express');
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);
const port = process.env.PORT || 5000;

console.log("express project");
connectDb();
app.use(express.json());
app.use("/LZW", require("./routes/LZW_Routes"));
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})