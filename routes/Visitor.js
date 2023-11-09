const express = require('express');
const router = express.Router();
const moment = require("moment");
const app = express();
const { Device, Visitor, Sequelize} = require('../models');
const { authentication } = require('../middleware/authentication');
const verifyRoles = require('../middleware/verifyRoles');
const roles_list = require('../config/roles_list');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.delete('/delete/:id', authentication, async (req, res) => {
   const visitor_id = req.params.id
   const visitor = await Visitor.findOne({ where: { visitor_id } })
   email = visitor.email
   // console.log(email, visitor_id)
   try {
      if (visitor) {
         email = visitor.email
         await Visitor.destroy({ where: { visitor_id } })
         console.log("Visitor profile deleted successfully")
         return res.status(200).send({
            statusCode: 200,
            message: "Visitor profile for id: " + visitor_id + " has been deleted successfully"
         });
      }
      if (!visitor) {
         console.log("Visitor profile not found for Id: " + visitor_id)
         return res.status(404).send("Visitor profile not found for Id: " + visitor_id)
      }
   } catch (err) {
      email = visitor.email
      console.log(err)
      return res.status(500).send("Problem with deleting record of " + email);
   }
});
//Delete many records
router.delete('/delete/', authentication, async (req, res) => {
   const from = req.body.from;
   const to = req.body.to;
   const visitor = await Visitor.findAll({ where: {
      createdAt: 
      Sequelize.literal(`createdAt BETWEEN '${from}' AND '${to}'`) 
      } 
   })    
   try {
      if (visitor) {
         // email = visitor.email
         await Visitor.destroy({ where: { 
            
         } })
         // console.log("Visitor profile deleted successfully")
         return res.status(200).send({
            statusCode: 200,
            message: "Visitor profiles has been deleted successfully"
         });
      }
      if (!visitor) {
         // console.log("Visitor profile not found for Id: " )
         return res.status(404).send("Visitor records not found" )
      }
   } catch (err) {
      email = visitor.email
      console.log(err)
      return res.status(500).send("Problem with deleting record of " + [email]);
   }
})
module.exports = router;
