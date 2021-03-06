const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');

router.get('/register',(req,res)=>{
    res.render('register');
});
router.post('/register',(req,res)=>{

    const name = req.body.name;
    const email = req.body.emai;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;

    req.checkBody('name','Name is required').notEmpty();
    req.checkBody('username','Username is required').notEmpty();
    req.checkBody('email','Email is required').notEmpty();
    req.checkBody('email','Email is required').isEmail();
    req.checkBody('passord','Password is required').notEmpty();
    req.checkBody('password2','Password is not a match').equals(req.body.password);

    let errors = req.validationErrors();

    if(errors){
        res.render('register',{errors:errors});
        return;
    } else{
        let newUser = new User({
            name:name,
            email:email,
            username:username,
            password:password
        });
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                newUser.password = hash;
                newUser.save((err)=>{
                    if(err){
                        console.log(err);
                        return;
                    }else{
                        res.flash('success','You are now registered');
                        res.redirect('/users/login');
                    }
                });
            });
        });
    }
    res.render('register');
});

module.exports = router;
