const express = require('express');
const router = express.Router();
const {
    getHistories,
    createHistory,
    getHistoryById,
    deleteHistory,
    deleteAllHistories,
    compress,
    decompress
} = require("../controllers/LZW_Controller");

// status : 
// 100 - Informational
// 200 - OK  
// 300 - Redirect
// 400 - Bad Request
// 500 - Internal Server Error

router.route('/').get(getHistories).post(createHistory).delete(deleteAllHistories);
router.route("/compress").post(compress);    
router.route("/decompress").post(decompress);
// urutan ini penting, jika tidak, maka akan dianggap id = 'compress' atau 'decompress'
// :(sesuatu) adalah parameter
router.route("/:id").get(getHistoryById).delete(deleteHistory);

module.exports = router;