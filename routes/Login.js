const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');
const { authentication } = require('../middleware/authentication');

router.post('/', loginController)

module.exports = router;
