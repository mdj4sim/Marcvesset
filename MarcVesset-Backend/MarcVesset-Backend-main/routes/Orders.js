const express = require("express");
const router = express.Router();

// importing controllers of merchandise
const{
    createMerchandise,
    updateMerchandise,
    deleteMerchandise,
    showAllMerchandise
} = require("../controllers/Merchandise");

// importing middlewares
const {auth , isAdmin , isUser} = require("../middlewares/auth");

// **************************************************************
//                          Router for merchandise
// **************************************************************
router.post("/createMerchandise" ,auth , createMerchandise);
router.post("/updateMerchandise",auth , isAdmin, updateMerchandise);
router.delete("/deleteMerchandise" , auth , isAdmin ,deleteMerchandise);
router.get("/showAllMerchandise", showAllMerchandise);

module.exports = router;