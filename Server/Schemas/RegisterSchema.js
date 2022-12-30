const mongoose = require('mongoose');

const register = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    number:{
        type:Number,
        require:true
    },
    otp:{
        type:String,
        require:false
    },
    role:{
        type:String,
        require:false
    }
},{timeStamp:true});
module.exports = mongoose.model("register",register)