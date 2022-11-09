const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/env.json");
const userRouter = require("./routes/userRouter");

const app = express();

app.use(express.json());

app.use("/users", userRouter);

mongoose.connect(config.url)
    .then(app.listen(config.porta, () => {
        console.log("API is ON!");
    }))
    .catch(error => {
        console.log("API is OFF", error.message);
    })