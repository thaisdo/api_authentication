const jwt = require("jsonwebtoken");
const config = require("../config/env.json");

module.exports = async function(req, res, next) {
    
    const { authorization } = req.headers;
    if(!authorization) {
        return res.status(401).json({erro: "Authentication not exists"});
    }

    const [tipo, token] = authorization.split(" ");
    if(!token) {
        return res.status(401).json({erro: "Token not exists"})
    }

    jwt.verify(token, config.segredo, (error, userInfo) => {
        if(error) {
            return res.status(401).json({erro: "Invalid Token"})
        }
        req.body.id = userInfo.id;
    });
    next();
}