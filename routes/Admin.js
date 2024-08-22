const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const app = express();
const { authentication } = require('../middleware/authentication');
const roles_list =require('../config/roles_list');
const verifyRoles = require('../middleware/verifyRoles');

router.post('/signup', authentication, adminController.createUser);

router.get('/all-admin', authentication, adminController.getAllAdmin);

router.get('/:email', authentication, verifyRoles(roles_list[0]), adminController.getOneAdmin);

router.put('/update/:id', authentication, verifyRoles(roles_list[0]), adminController.updateAdmin);

router.delete('/:email', authentication, verifyRoles(roles_list[0]), adminController.deleteAdmin);

module.exports = router;