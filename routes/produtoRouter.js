const express = require("express");
const authentication = require("../middlewares/authMiddleware")

const router = express.Router();

router.post("/", authentication, function(req, res) {
    res.json({msg: "Working"});
});

module.exports = router;