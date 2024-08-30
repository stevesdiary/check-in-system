const express = require('express');
const User = require('../models/admin');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');
const saltRounds = bcrypt.genSaltSync(11);

router.post('/register', );

module.exports = router;