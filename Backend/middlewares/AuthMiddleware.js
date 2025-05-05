
const jwt = require('jsonwebtoken');
require("dotenv").config();

const AuthCheck = (req,res,next) => {

    const authHeaderValue = req.headers.authorization || req.header('authorization');
    
    if(!authHeaderValue || !authHeaderValue.startsWith('Bearer ')){
        return res.status(401).json({success:false,message:"authorization denied"})
    }

    try{
        
        const token = authHeaderValue.split(" ")[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();


    }catch(error){  
        return res.json({success:false, message: 'Token is not valid' });
    }
}

module.exports = AuthCheck;