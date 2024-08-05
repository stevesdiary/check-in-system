const express = require('express');
const router = express.Router();
const app = express();
const { UUID } = require('sequelize');
const moment = require('moment');
const { Device, Admin, Visitor, Sequelize } = require('../models');
const Op = Sequelize.Op;
const { authentication } = require('../middleware/authentication');
const verifyRoles = require('../middleware/verifyRoles');
const roles_list = require('../config/roles_list');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Fetch visitors' History
router.get('/', authentication, );

module.exports = router;