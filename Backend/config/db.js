const mongoose = require("mongoose")
require("dotenv").config()


const DBConnect = async() => {

    try{
        const connection = await mongoose.connect(process.env.DB_URI);
        console.log("Db Connected...");
    }catch(error){
        console.log("Db error : ",error);
    }
}


module.exports = DBConnect;