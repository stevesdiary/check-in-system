const express = require('express');
const router = express.Router();
const visitorController = require ("../controllers/visitorController");
const { authentication } = require('../middleware/authentication');
const verifyRoles = require('../middleware/verifyRoles');

router.post("/", authentication, visitorController.createVisitor );

router.get('/visitorhistory', authentication, visitorController.visitorHistory);

router.get('/currentvisitor', authentication, visitorController.currentVisitor);

router.delete('/delete/:id', authentication, visitorController.deleteVistor);

router.delete('/deletemany/', authentication, visitorController.deleteManyVisitor);

module.exports = router;
