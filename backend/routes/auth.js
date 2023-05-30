const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = "ShhhhSecret";

//ROUTE 1:  Creating a User using : POST "/api/auth/createUser" . Doesn't require auth
router.post('/createUser',  [
    body('name','Enter Valid Name').isLength({min:3}), 
    body('email','Enter Valid Email').isEmail(),
    body('password','Password Should Be atleast Length Of 5').isLength({min:5})
],async (req,res)=>{
    let success=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    else{
            try{
                const email = req.body.email;
                const result = await User.find({"email":email}).exec();
                if(result.length){
                    res.json({success,"Email": email + " Already Exists"});
                }
                else
                {
                    const salt = await bcrypt.genSalt(10);
                    const securedPassword = await bcrypt.hash(req.body.password,salt);
                    const user = new User({
                        "name":req.body.name,
                        "email":req.body.email,
                        "password":securedPassword
                    });
                    user.save();
                    const data = {
                        user : {
                            id:user.id
                        }
                    }
                    var authToken = jwt.sign(data, JWT_SECRET);
                    success=true;
                    res.json({success,authToken});
                }
            }
            catch(err){
                console.error(err.message);
                res.status(500).send("Internal Error Occured");
            }
                
    }
});



//ROUTE 2 : Authenticationg a User using : POST "/api/auth/login" . 
router.post('/login',  [
    body('email','Enter Valid Email').isEmail(),
    body('password','Password should not be NULL').exists()
],async (req,res)=>{
    
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success:success, errors: errors.array() });
    }
    else{
        const {email,password} = req.body;
        try{
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({success:success,error:"Enter Correct Credentials"});
            }

            const passwordCompare = await bcrypt.compare(password,user.password);
            if(!passwordCompare){
                return res.status(400).json({success:success,error:"Enter Correct Credentials"});
            } 
            
            const data = {
                user : {
                    id:user.id
                }
            }
            var authToken = jwt.sign(data, JWT_SECRET);
            success=true;
            res.json({success:success,authToken});
        }
        catch(err){
            console.error(err.message);
            res.status(500).send("Internal Error Occured ");
        }
    }
});


//ROUTE 3 : Getting Logged User Details using : POST "/api/auth/getUser".
router.post('/getUser', fetchuser ,async (req,res)=>{
    try {
        const userId =  req.user.id;
        const user  = await User.findById(userId).select("-password");
        res.send(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Internal Error Occured hhh");
    }
});




module.exports = router

