const mongoose = require('mongoose');
const constants = require('../constants/constants');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name : {type:'String', required:[true,'Name is Missing']},
    email : {type:'String', required: [true,'Email is missing']},
    mobile : {type:'String', required: [true,'Mobile is missing']},
    password : {type:'String', required: [true,'Password is missing']},
    role : {
        type: 'String', 
        enum: ["USER","ADMIN"],
        default: "USER"
    }
});

// Encrypting Password ....
UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Decrypting Password ...
UserSchema.methods.matchPassword = async function(reqPassword){
    return await bcrypt.compare(reqPassword, this.password);
}

// JWT ....
UserSchema.methods.getSignedJwtToken = function(){
    var payload = {
        id : this._id,
        role : this.role,
        name : this.name,
        password : this.password
    };

    return jwt.sign({ payload: payload }, constants.JWT_SECRET,{
        expiresIn: constants.JWT_EXPIRE
    });
};

module.exports = mongoose.model('User',UserSchema);