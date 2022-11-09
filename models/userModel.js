const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email was not informed"],
        trim: true,
        unique: true
    },
    password: {
    type: String, 
    required: [true, "Password was not informed"],
    trim: true,
    select: false
    }
});

module.exports = mongoose.model("User", userSchema)