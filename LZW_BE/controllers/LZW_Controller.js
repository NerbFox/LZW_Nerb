const asyncHandler = require("express-async-handler");
const History = require("../models/Model");   

//@desc Get all history
//@route GET /LZW
//@access Public
const getHistories = asyncHandler(async (req, res) => {
    const history = await History.find();
    res.status(200).json(history);
});

//@desc Get a history
//@route GET /LZW/:id
//@access Public
const getHistoryById = asyncHandler(async (req, res) => {
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
    const history = await History.findById(req.params.id);
    if(history){
        await history.remove();
        res.json({message: "History removed"});
    }else{
        res.status(404);
        throw new Error("History not found");
    }
});

//@desc Delete all history
//@route DELETE /LZW
//@access Public
const deleteAllHistories = asyncHandler(async (req, res) => {
    const deleteResult = await History.deleteMany();
    if (deleteResult.deletedCount > 0) {
      res.json({ message: "History removed" });
    } else {
      res.status(404);
      throw new Error("History not found");
    }
  });  

module.exports = { 
    getHistories,
    createHistory,
    deleteHistory,
    deleteAllHistories,
    getHistoryById
};