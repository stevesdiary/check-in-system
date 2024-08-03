const express = require('express');
const User = require('../models/admin');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = bcrypt.genSaltSync(11);

router.post('/register', async (req, res) => {
  try {
      const { email, password, role } = req.body;
      const userExists = await User.findOne({ where: {email} });
      // return res.status(400).json({
      //    message: 'Email already exists, login to continue'
      // });
      if(userExists){
        return res.json({ message: `User ${email} already exists, log in to continue.`});
      }
      const newUser = new User ({ email, password, role});
      const savedUser = await newUser.save().catch((err) => {
        res.json({ error: "Cannot register user at the moment!", err});
      });
      const admin_id = req.admin.id;
      if (admin_id)
      if (savedUser) res.status(201).json({ message: `User ${email} has been registered successfully.`})
  } catch (error) {
      return res.status(500).json({ message: "An error ocured", error });
  }
});

module.exports = router;