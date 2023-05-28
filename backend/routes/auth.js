const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Creating a User using : POST "/api/auth" . Doesn't require auth
router.post('/',  [
    body('name','Enter Valid Name').isLength({min:3}), 
    body('email','Enter Valid Email').isEmail(),
    body('password','Password Should Be atleast Length Of 5').isLength({min:5})
],async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    else{
                const email = req.body.email;
                const result = await User.find({"email":email}).exec();
                if(result.length){
                    res.send("Email Already Exists");
                }
                else
                {
                    const user = new User(req.body);
                    user.save();
                    res.send(req.body);
                }
    }
});

module.exports = router

