const express = require('express');
const User = require('../models/admin');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = bcrypt.genSaltSync(11);

router.post('/register', async (req, res) => {
   const { email, password, role } = req.body;

   const userExists = await User.findOne({ where: {email} }).catch((err) => {
      console.log('email already exists', err);
      return res.status(400).json({
         error: 'Email already exists'
      })
   })

   if(userExists){
      return res.json({ message: 'User ' + email + ' already exists'});
   }

   const newUser = new User ({ email, password, role});
   const savedUser = await newUser.save().catch((err) => {
      console.log("Error: ", err);
      res.json({ error: "Cannot register user at the moment! ", err});
   });
   const admin_id = req.admin.id;
   if (admin_id)
   console.log(admin_id)
   if (savedUser) res.status(201).json({ message:"User " + email + " has been registered successfully."})
   
});

module.exports = router;