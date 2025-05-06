const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.PORT || 8000
const cors = require('cors');
const DBConnect = require("./config/db")
const UserRoutes = require("./routes/UserRoutes")
const ImageRoute = require("./routes/ImageRoute")


DBConnect()

app.use(express.json());
app.use(cors({
  origin: 'https://abhaypixel.vercel.app',
  credentials: true,
}));


app.use("/api/auth",UserRoutes);
app.use("/api/image",ImageRoute);


app.get("/",(req,res) => {     
    res.json({message:'welcome'})
})

app.listen(port,()=>{
    console.log("Server Started On Port : ",port);
})