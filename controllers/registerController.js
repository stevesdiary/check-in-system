const express = require('express');
const router = express.Router();
const app = express();
const helmet = require('helmet');
app.use(helmet());
const { v4: uuidv4 } = require('uuid');
const { Admin } = require('../models');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const bcrypt = require('bcryptjs');
const saltRounds = bcrypt.genSaltSync(11);

const register = async (req, res) => {
   const admin_id = uuidv4()
   const { name, email, password, confirmPassword, role } = req.body;
   if (password !==  confirmPassword) {
      return res.status(400).send('Password do not match!')
   }
   const hashed = await bcrypt.hash(password, saltRounds)
   const admin = await Admin.findOne({
      where: {email: email},
      defaults: { 
         admin_id: uuidv4,
         name: name,
         role: role,
         password: hashed,
      }
   })
      if(!(email || password || role || name))return ("You need to enter the required fields.")
      if(admin){
         return res.status(400).send(`User ${email} already exists, login with your email and password.`);
      }
      const newAdmin = await Admin.create({
      admin_id : admin_id,
      name : name,
      email : email,
      password : hashed,
      role : role
   });
      return res.status(200).send('User: '+ email + ' has been created successfully.');
})
module.exports = register;