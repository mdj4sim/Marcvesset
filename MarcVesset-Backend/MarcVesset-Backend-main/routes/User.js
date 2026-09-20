const express = require("express");
const router = express.Router();

const {login , signup} = require("../controllers/Auth");
const {auth , isAdmin ,isUser } = require("../middlewares/auth");

// Routes for login , signup and uthentication
// ****************************************************************
//                      Authentication routes
// ****************************************************************
// route for user login
router.post("/login" , login);

// route for user signup
router.post("/signup", signup);

// exports the router for use in the main application
module.exports = router;