const express = require('express');
const UserData = require('../model/userModel.js');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const signup = async (req,res)=>{
    try{
        const loggedinUser = await UserData.findOne({email:req.body.email});
    if(loggedinUser){
        return res.status(500).json({message:'User is already present please login'});
    }
    if(req.body.email===''||req.body.phone===''||req.body.name===''||req.body.password===''){
        return res.status(500).json({message:'Please enter all fields'});
    }
    req.body.password=await bcrypt.hash(req.body.password, 10);
    const user =  await UserData.create(req.body);
    res.status(201).json({message:'User signed up successfully'});
    }
    catch(error){
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
};
const loginUser  = async (req,res)=>{
    try{
        const loggedinUser = await UserData.findOne({email:req.body.email});
    if(!loggedinUser){
        return res.status(404).json({message:"User not Found! Register User"});
    }
    const isMatch = bcrypt.compareSync(req.body.password, loggedinUser.password);
    if(!isMatch){
        return res.status(400).json({message:"User Credentials are invalid"});
    }
    const token = jwt.sign({username:loggedinUser.name,email:loggedinUser.email},process.env.secretKey,{expiresIn:'1min'});
    res.status(201).json({token,message:"User logged in successfully",userId:loggedinUser._id,username:loggedinUser.name});
    }
    catch(error){
	console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
    }
const jwtToken = async (req,res)=>{
    try{
        const loggedinUser = await UserData.findOne({_id:req.body.userId});
    const token = jwt.sign({username:loggedinUser.name,email:loggedinUser.email},process.env.secretKey,{expiresIn:'1min'});
    res.status(201).json({token});
    }
    catch(error){
        res.status(500).json({ error: 'Internal Server Error' });
    }
    
    }
module.exports={signup,loginUser,jwtToken};