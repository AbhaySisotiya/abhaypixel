const express  = require("express")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../models/UserModel")
require("dotenv").config();

const secret_key = process.env.SECRET_KEY;

const SignupUser = async(req,res) => {

    try{
        const {firstName,lastName,email,password} = req.body;
       

        if(!firstName || !lastName || !email.trim() || !password) {
            return res.json({success:false,message:"All field Must Required.."})
        }

        const ExistingUser = await UserModel.findOne({email:email});
        if(ExistingUser) return res.json({success:false,message:"User already Exists"})


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const user = new UserModel({firstName,lastName,email,password:hashedPassword});
        await user.save();

        res.json({success:true,message:"User Register Successfully",data:user})
    
    }catch(error){
        console.log(error);
        res.status(400).json({success:false,message:"Internal Server Error : "+error})    
    }
}

const LoginUser = async(req,res) => {
    

    try{
        
        const {email,password} = req.body;

        if(!email || !password) {
            return res.json({success:false,message:"All field Must Required.."})
        }

        const user = await UserModel.findOne({email:email});

        if(!user) return res.json({success:false,message:"Invalid email Or Password"});


        if(!await bcrypt.compare(password,user.password)){
            return res.json({success:false,message:"Invalid email or Password"});
        }

        token = jwt.sign({userid:user._id,email:user.email},secret_key,{expiresIn:'1h'})

        res.json({success:true,token:token});

    }catch(error){
        console.log(error);
        res.status(400).json({success:false,message:"Internal Server Error : "+error})    
    }
   
}

const GetUser = async(req,res) => {

    
    try{
        const {userid} = req.user;
        
        const user = await UserModel.findById({_id:userid});
        res.json({success:true,user})    
    
    }catch(error){
        console.log(error);
        res.status(400).json({success:false,message:"Internal Server Error : "+error})    
    }
    
    
}

module.exports = {SignupUser,LoginUser,GetUser}