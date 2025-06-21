const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post('/register', async(req,res) =>{
    const {name, email, password} = req.body;

    try{
        const existingUser = await User.findOne({email});
        if (existingUser != null){
            return res.status(400).json({message: 'User already exists.'});
        }

        const hash = await bcrypt.hash(password, 10);
        const user = new User({name, email, passwordHash});
        await user.save();
        res.status(201).json({message:'User has been registered'})
    }
    catch(err){
        res.status(500).json({message:'Server error.'})
    }
});

router.get('/signin', async(req,res) => {
    const user = {username, password}

    try{
        const existingUser = await User.findOne({email});
        if (existingUser) {
            res.status(201).json({message:'User found.'})
            const correctPass = bcrypt.compare(password, user.passwordHash)
            if (correctPass) {
                res.status(201).json({message:'User found and password match.'})
                const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, { expiresIn: '2d' });
                res.json({jwtToken: token, user:{userId: user._id, name:user.name, email: user.email}});
            }else {
                res.status(400).json({message:'Incorrect password.'});
            }
        }else {
            res.status(400).json({message:'Invalid email, user not found.'});
        }
    }catch(err){
        res.status(500).json({message:'Server error.'});
    }
});

module.exports = router;
