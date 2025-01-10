const mongoose = require('mongoose');

const UserSchem = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
});

const USerModals = mongoose.model('user', UserSchem);

module.exports = USerModals;