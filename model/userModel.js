const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter the Name"]
    },
    email:{
        type:String,
        required:[true,"please enter the Email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"please enter the Password"]
    },
    phone:{
        type:String,
        required:[true,"please enter the Phone Number"]
    }
});
const UserData = mongoose.model("UserData", userSchema);
module.exports = UserData;