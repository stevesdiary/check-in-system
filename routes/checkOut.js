const express = require("express");
const router = express.Router();
const { authentication } = require("../middleware/authentication");
const checkoutController = require('../controllers/checkoutController');
const verifyRoles = require("../middleware/verifyRoles");
const roles_list = require("../config/roles_list");

router.post("/checkout", authentication, checkoutController.checkout);

module.exports = router;
