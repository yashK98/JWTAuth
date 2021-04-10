const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {type:'String', required:[true,'Name is Missing']},
    email : {type:'String', required: [true,'Email is missing']},
    mobile : {type:'String', required: [true,'Mobile is missing']},
    password : {type:'String', required: [true,'Password is missing']}
});

module.exports = mongoose.model('User',UserSchema);