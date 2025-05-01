const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.PORT || 8000
const DBConnect = require("./config/db")
const UserRoutes = require("./routes/UserRoutes")

// database connection
DBConnect()

// middlewares
app.use(express.json());

// routing

app.use("/api/auth",UserRoutes);


const bcrypt = require('bcrypt');



app.get("/",(req,res) => {     
    res.json({message:'welcome'})
})

app.listen(port,()=>{
    console.log("Server Started On Port : ",port);
})