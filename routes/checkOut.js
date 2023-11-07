const express = require("express");
const router = express.Router();
const moment = require("moment");
const app = express();
const { Visitor } = require("../models");
const { authentication } = require("../middleware/authentication");
const verifyRoles = require("../middleware/verifyRoles");
const roles_list = require("../config/roles_list");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post("/", authentication, async (req, res) => {
  try {
    const visitor_id = req.body.visitor_id;
    const departure = req.body.departure || moment().format('LT');

    if (departure !== undefined && departure !== null) {
      const visitor = await Visitor.findOne({ where: { visitor_id } });
      (visitor.departure = departure)
      
      if (visitor) {
        await visitor.save()
        // console.log("DEPARTURE TIME: ", visitor.departure);
      }
      return res.status(200).send({
        statusCode: 200,
        message: "Checked out successfully",
        visitor,
      });
    } else {
      console.log("Unable to check out");
      return res
        .status(500)
        .send({
          Message: "An error occurred while checking out check the input time", 
          err
        });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
