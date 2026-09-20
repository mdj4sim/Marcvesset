const express = require("express");
const router = express.Router();

const {auth , isAdmin ,isUser } = require("../middlewares/auth");
const{
    pushGoods,
    pullGoods,
    showAllGoods
} = require("../controllers/AddToCart");

router.post("/addToCart", auth , pushGoods);
router.get("/removeFromCart", auth , pullGoods);
router.post("/showAllGoods", auth, showAllGoods);

module.exports = router;