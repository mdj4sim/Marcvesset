const express = require("express");
const router = express.Router();

// import the controllers
const {
    createTicket,
    showAllTickets,
    deleteTickets
} = require("../controllers/Tickets");

// importing middlewares
const {auth , isAdmin , isUser} = require("../middlewares/auth");

// ***************************************************************
//                         Tickets routes
// ***************************************************************

// tickets can only be  created by admin
router.post("/createTickets" , auth ,createTicket);

// routes for show all tickets
router.get("/showAllTickets",showAllTickets);

// routes for deleteTickets
router.delete("/deleteTickets" ,auth , isAdmin, deleteTickets);

module.exports = router;