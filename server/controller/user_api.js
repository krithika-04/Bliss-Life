const User = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require("dotenv").config();
const key =process.env.secret;
module.exports = class USER_API{
    //register
    static async register(req,res){
       try {
        const user_data = req.body;
        
    if (user_data.password !== user_data.confirm_password) {
        return res.status(400).json({
            msg: "Password do not match."
        });
    }
    // Check for the unique Username
   const chk_uname= await User.findOne({
        username: user_data.username
    })
    const chk_email= await User.findOne({
        email:user_data.email
    })
        if (chk_uname) {
           return  res.status(400).json({
            
                msg: "Username is already taken."
            });
            
        }
    
    // Check for the Unique Email
  
   else if (chk_email) {
            return res.status(400).json({
                msg: "Email is already registred. Did you forgot your password."
            });
        }
    
    // The data is valid and new we can register the user
    
    // Hash the password
    //bcrypt.genSalt(10, (err, salt) => {
        const salt = await bcrypt.genSaltSync(10);
const password = await req.body.password;
 await   bcrypt.hash(password, salt, (err, hash) => {
            //if (err) throw err;
            user_data.password = hash;
            User.create(user_data);
          return  res.status(201).json({
            success: true,
              message:"user created"});
        });
   // });
       } catch (error) {
           res.status(404).json({message:error.message});
       }
    }
    //login
    static async login(req,res){
        
        try {
        await  User.findOne({
                username: req.body.username
            }).then(user => {
                if (!user) {
                    return res.status(404).json({
                        msg: "Username is not found.",
                        success: false
                    });
                }
                // If there is user we are now going to compare the password
             bcrypt.compare(req.body.password, user.password).then(isMatch => {
                    if (isMatch) {
                        // User's password is correct and we need to send the JSON Token for that user
                        const payload = {
                            _id: user._id,
                            username: user.username,
                            name: user.name,
                            email: user.email
                        }
                        jwt.sign(payload, key, {
                            expiresIn: 604800
                        }, (err, token) => {
                            res.status(200).json({
                                success: true,
                                token: `Bearer ${token}`,
                                user: user,
                                msg: "Hurry! You are now logged in."
                            });
                        })
                    } else {
                        return res.status(404).json({
                            msg: "Incorrect password.",
                            success: false
                        });
                    }
                })
            });
            
        } catch (error) {
            res.status(404).json({message:error.message});
        }
     }
     static async Profile(req,res){
        try {
            return res.status(200).json({
                user: req.user
            });
        } catch (error) {
            res.status(404).json({message:error.message});
        }
     }
     
}