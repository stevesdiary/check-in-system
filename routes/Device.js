const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');
const { authentication } = require('../middleware/authentication');
const roles_list  = require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

router.post('/', authentication, deviceController.createDevice);

router.get('/devices', authentication, deviceController.getDevices);

router.put('/:id', authentication, verifyRoles(roles_list[0]), deviceController.updateDevice);

router.delete('/:id', authentication, verifyRoles(roles_list[0]), deviceController.deleteDevice)

module.exports = router;