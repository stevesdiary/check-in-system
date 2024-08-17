const express = require("express");
const router = express.Router();
const visitorController = require ("../controllers/visitorController");
const { authentication } = require("../middleware/authentication");
const verifyRoles = require("../middleware/verifyRoles");

router.post("/", authentication, visitorController.createVisitor )

module.exports = router;
