const express = require('express');
const router = express.Router();
const app = express();
const axios = require('axios');
const { Visitor } = require('../models');
const { authentication } = require('../middleware/authentication');
const verifyRoles = require('../middleware/verifyRoles');
const roles_list = require('../config/roles_list');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.post('/', authentication, async (req, res) => {
   const visitor_id = req.body.user_id
   const image_string = req.body.image_string
   try {
      const visitor = await Visitor.findOne({ where: { visitor_id } })

      axios({
         method: 'post',
         url: process.env.IMAGE_UPLOAD_URL,
         data: {
            user_id: visitor_id,
            photo: image_string
         },
      }).then(async (response) => {
         const photo = process.env.PHOTO_URL + response.data.data.filename

         if(photo !== null && photo !== undefined){
            visitor.image_path = photo,
            visitor.save()
         }
         // console.log("Visitor photo uploaded successfully ")
         return res.status(200).send({
            statusCode: 200,
            photo: photo,
            visitor_id: visitor_id
         });

      }), (error) => {
         console.log(error)
         return res.status(500).json(err)
      }

   } catch (err) {
      console.log(err)
      return res.status(500).json(err)
   }
})
module.exports = router;