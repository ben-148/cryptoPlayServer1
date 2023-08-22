const express = require("express");
const router = express.Router();

const authRouter = require("./api/users");
const coinsRouter = require("./api/coins");

// http://localhost:8181/api

//http://localhost:8181/api/users/
router.use("/users", authRouter);

//http://localhost:8181/api/coins
router.use("/coins", coinsRouter);

module.exports = router;
