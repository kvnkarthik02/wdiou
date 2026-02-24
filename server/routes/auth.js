const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

//user registration
router.post('/register', async(req,res) =>{
    try{
        //read request body
        const {name, email, password} = req.body; 

        //check if user email exists already
        const existingUser = await User.findOne({email});
        if (existingUser != null){
            return res.status(400).json({message: 'User already exists.'});
        }
        //new registration confirmed, calculate hash of password
        const passwordHash = await bcrypt.hash(password, 10);
        //generate new user document
        const user = new User({name, email, passwordHash});
        //save document
        await user.save();
        res.status(201).json({message:'User has been registered'})
    }
    catch(err){
        res.status(500).json({message:err});
        console.log(err);
    }
});

router.post('/signin', async(req,res) => {
    try{
        //read request body
        const {email, password} = req.body;

        //check if user is registered already
        const existingUser = await User.findOne({email});
        if (existingUser) {
            // res.status(201).json({message:'User found.'})
            // compare user provided password and password hash stored in db
            const correctPass = await bcrypt.compare(password, existingUser.passwordHash);
            if (correctPass) {
                //valid user sign-in, provide JWT token to user and perform successful sign-in
                const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_TOKEN, { expiresIn: '2d' });
                return res.status(201).json({jwtToken: token, user:{userId: existingUser._id, name:existingUser.name, email: existingUser.email}});
            }else {
                return res.status(400).json({message:'Incorrect password.'});
            }
        }else {
            res.status(400).json({message:'Invalid email, user not found.'});
        }
    }catch(err){
        res.status(500).json({message:'Server error.'});
    }
});

module.exports = router;
