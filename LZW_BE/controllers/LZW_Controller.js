const asyncHandler = require("express-async-handler");
const History = require("../models/Model");   
const { compressLZW, decompressLZW } = require("../algo");
//@desc Get all history
//@route GET /LZW
//@access Public
const getHistories = asyncHandler(async (req, res) => {
    console.log("I am in getHistories...");
    // console.log("The request body is: ", req.body);
    // console.log("The request params is: ", req.params);
    const history = await History.find();
    res.status(200).json(history);
});

//@desc Get a history
//@route GET /LZW/:id
//@access Public
const getHistoryById = asyncHandler(async (req, res) => {
    console.log("I am in getHistoryById...");
    console.log("The request body is: ", req.body);
    console.log("The request params is: ", req.params);
    const history = await History.findById(req.params.id);
    if(history){
        res.json(history);
    }else{
        res.status(404);
        throw new Error("History not found");
    }
});

//@desc Create a history
//@route POST /LZW
//@access Public
const createHistory = asyncHandler(async (req, res) => {
    const {type, input, output} = req.body; 
    const histories = await History.find();
    console.log("The request body is: ", req.body);
    console.log("\nThe request body history is: ", req.body.history);

    if(!type || !input || !output){
        console.log("error");
        res.status(400);
    }
    // if not unique input then return error
    if(histories.find(history => history.input === input)){
        console.log("The input is not unique");
        res.status(400);
    }
    const history = await History.create({type, input, output});
    res.status(201).json({history});
    console.log("The history was added successfully");
});

//@desc Delete a history
//@route DELETE /LZW/:id
//@access Public
const deleteHistory = asyncHandler(async (req, res) => {
    console.log("I am in deleteHistory by id...");
    try{
        const history = await History.findByIdAndDelete(req.params.id);
        console.log("The request body is: ", req.body);
        if(history){
            console.log("The history was deleted successfully");
            res.json({ message: "History removed" });
        }else{
            console.log("The history was not found");
            res.status(404);
            throw new Error("History not found");
        }
    }catch(err){
        console.log("Error: ", err);
        res.json({ message: "History not found" });
        res.status(404);
    }
});

//@desc Delete all history
//@route DELETE /LZW
//@access Public
const deleteAllHistories = asyncHandler(async (req, res) => {
    console.log("I am in deleteAllHistories...");
    const deleteResult = await History.deleteMany();
    if (deleteResult.deletedCount > 0) {
      res.json({ message: "History removed" });
    } else {
      res.status(404);
      throw new Error("History not found");
    }
  });  

const compress = asyncHandler(async (req, res) => {
    // Perform LZW compression on asciiInput from algo.js
    console.log("I am in compress");
    const result = await compressLZW(req.body.message);
    res.status(200).json({"message": result});
    console.log("result: ", result);
});

const decompress = asyncHandler(async (req, res) => {
    // Perform LZW decompression on binaryInput from algo.js
    console.log("I am in decompress");
    const result = decompressLZW(req.body.message);
    res.status(200).json({message: result});
    console.log("result: ", result);
});

    

module.exports = { 
    getHistories,
    createHistory,
    deleteHistory,
    deleteAllHistories,
    getHistoryById,
    compress,
    decompress
};