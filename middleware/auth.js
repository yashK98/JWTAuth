const jwt = require('jsonwebtoken');
const constants = require('../constants/constants');
const User = require('../models/User');
const userModel = require('../models/User');

exports.protect = async(req,res,next) => {
    let token;
    if(!req.headers.authorization){
        res.send(400).json({error: "Not a valid User"});
    }

    token = req.headers.authorization;
    try{
        const decoded = jwt.verify(token, constants.JWT_SECRET);
        req.user = await userModel.findById(decoded.payload.id);
    }catch(err){
        console.log("Not a valid User");
        res.send(400).json({error: "Not a valid User"});
    }

    next();
}