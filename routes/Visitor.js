const express = require('express');
const router = express.Router();
const visitorController = require('../controllers/visitorController');
const { authentication } = require('../middleware/authentication');
const verifyRoles = require('../middleware/verifyRoles');

router.delete('/delete/:id', authentication, )

router.delete('/deletemany/', authentication, visitorController.deleteManyVisitor );

module.exports = router;
