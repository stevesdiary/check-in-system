const express = require('express');
const router = express.Router();
const { authentication } = require('../middleware/authentication');
const verifyRoles = require('../middleware/verifyRoles');
const roles_list = require('../config/roles_list');

router.get('/', authentication, )

module.exports = router;