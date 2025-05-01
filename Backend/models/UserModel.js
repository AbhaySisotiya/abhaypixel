const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        unique:true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
},{timestamps:true});

const UserModel =  mongoose.model("user",UserSchema);


module.exports = UserModel;