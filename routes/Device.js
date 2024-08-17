const express = require('express');
const router = express.Router();
const { authentication } = require('../middleware/authentication');
const roles_list  = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');




// Create device
router.post('/', authentication, );

router.get('/devices', authentication, )

router.put('/:id', authentication, verifyRoles(roles_list[0]) )

router.delete('/:id', authentication, verifyRoles(roles_list[0]))

module.exports = router;