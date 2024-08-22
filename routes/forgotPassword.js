const express = require('express');
const router = express.Router();
const resetPasswordController = require('../controllers/forgotPasswordController');
const roles_list = require('../config/roles_list');

router.post('/forgot', resetPasswordController );
module.exports = router;