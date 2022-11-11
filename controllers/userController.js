const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const config = require("../config/env.json");

async function register(req, res){
    const user = new User(req.body);
    await user.save()
    .then(doc => {
        doc.password = undefined;
        return res.status(201).json(doc)
    })
    .catch(error => {
        const msg = {};
        if(error.errors) {
        Object.values(error.errors).forEach(({properties}) => {
            msg[properties.path] = properties.message;
        });
    }
        if(error.code == 11000) {
            msg["erro"] = "Email already exists"
        }
        console.log(error);
        return res.status(422).json(msg);
    });
}

async function login(req, res){
    const {email, password} = req.body;
    await User.findOne({email})
    .select("+password")
    .then(doc => {
        if(!doc){
            return res.status(404).json({erro: "User not exists"});
        }
        const authentication = bcrypt.compareSync(password, doc.password);
        if(!authentication) {
            return res.status(400).json({erro: "Password is Invalid"});
        }
        const token = jwt.sign({id: doc._id}, config.segredo, {expiresIn: "1d"});
        return res.json({email, token});
    })
    .catch(error => {
        return res.status(500).json(error);
    })
}

module.exports = { register, login }

