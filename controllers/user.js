const path = require('path');
const sequelize = require('../database/connection');
const User = require('../models/User');
const passwordEncryption = require('../util/encryptPassword');
const jwtToken = require('../util/jwtToken');

exports.createNewUser = async (req, res) => {
    try{
        const user = await User.findOne({
            where : {
                email : req.body.userEmail
            }
        });
        if(!user){
            const jwt = await jwtToken.createToken(req.body.userEmail);
            req.body.userPassword = await passwordEncryption.encryptPassword(req.body.userPassword);
            User.create({
                name: req.body.userName,
                email: req.body.userEmail,
                password: req.body.userPassword,
                jwt : jwt
            }).then(result => {
                res.send('User Created, Please Login')
            }).catch(err => {
                res.send('Something went wrong!')
            }); 
        }else{
            res.status(200).send('Email Already Exists!')
        }
    }
    catch(err){
        console.error(err);
        res.status(400).json(null);
    }
}

exports.checkUser = async (req, res) => {
    try{
        const user = await(User.findOne({
            where : {
                email : req.body.userEmail
            }
        }));
        if(user){
            res.status(200).send(true);
        }else{
            res.status(200).send(false);
        }
    }
    catch(err){
        console.log(err);
        res.status(400).json(null);
    }
}

exports.authenicateUser = async (req, res) => {
    try{
        const user = await User.findOne({
            where : {
                email : req.body.userEmail
            }
        });
        if(user){
            if(await passwordEncryption.decryptPassword(req.body.userPassword, user.password)){
                res.cookie('user', user.jwt);
                res.status(200).send('Account Verified!, Moving to Home Page')
            }else{
                res.status(401).send('Incorrect Email or Password')
            }
        }else{
            res.status(404).send(`Account Doesn't Exist`);
        }
    }
    catch(err){
        console.error(err);
        res.status(400).json(null);
    }
}

