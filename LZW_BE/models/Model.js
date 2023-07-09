const mongoose = require("mongoose");

const LZW_Schema = mongoose.Schema(
    // history has two types of data: ascii and binary from the input, each of them has output
    {
        type: {
            type: String,
            required: [true, "Please provide a type"],
            maxlength: [20, "Type should be less than 20 characters"]
        },
        input: {
            type: String,
            required: [true, "Please provide an input"],
            unique: true
        },
        output: {
            type: String,
            required: [true, "Please provide an output"]
        },
    },
    { timestamps: true }        
);
console.log("Model.js");
module.exports = mongoose.model("Histories", LZW_Schema);

