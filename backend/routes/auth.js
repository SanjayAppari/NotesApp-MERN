const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// Creating a User using : POST "/api/auth" . Doesn't require auth
router.post('/createUser',  [
    body('name','Enter Valid Name').isLength({min:3}), 
    body('email','Enter Valid Email').isEmail(),
    body('password','Password Should Be atleast Length Of 5').isLength({min:5})
],async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else{
            try{
                const email = req.body.email;
                const result = await User.find({"email":email}).exec();
                if(result.length){
                    res.json({"Email": email + " Already Exists"});
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
                    res.send(user);
                }
            }
            catch(err){
                console.error(err.message);
                res.status(500).send("Some Error Occured");
            }
                
    }
});

module.exports = router

