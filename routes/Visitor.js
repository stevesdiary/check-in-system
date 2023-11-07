const express = require('express');
const router = express.Router();
const moment = require("moment");
const app = express();
const { Device, Visitor, Sequelize} = require('../models');
const Op = Sequelize.Op;
const { authentication } = require('../middleware/authentication');
const verifyRoles = require('../middleware/verifyRoles');
const roles_list = require('../config/roles_list');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Fetch current visitors In-house
// router.get('/current-visitors/', authentication, async (req, res) => {
//    try {
//       const search = req.query.search;
//       let name_purpose_search = []
//       if (search) {
//          name_purpose_search.push(
//             {
//                [Op.or]: [
//                   { first_name: { [Op.like]: `%${search}%` } },
//                   { last_name: { [Op.like]: `%${search}%` } },
//                   { purpose: { [Op.like]: `%${search}%` } }
//                ]
//             },
//          )
//       }
//       const count = await Visitor.count({
//          where: {
//             departure: { [Op.eq]: null },
//          [Op.and]:  [
//             ...name_purpose_search
//          ],
//          }
//       });
//       let per_page;
//       if (count < 10) {
//          per_page = count
//       } if (count > 9) {
//          per_page = 10
//       }
//       const page = parseInt(req.query.page) || 1;
//       const from = (page - 1) * per_page;
//       const to = page * per_page;
//       // const end = Math.min(startIndex + itemsPerPage, totalItems);
//       const total_pages = Math.ceil(count / per_page);
//       // const currentPage = total_pages
//       let visitor = await Visitor.findAll({
//          where: {
//             departure: { [Op.eq]: null },
//          [Op.and]:  [
//             ...name_purpose_search
//          ],
//          },
//          include: [{
//             model: Device
//          }],
//          page: { [Op.eq]: `${page}` },
//          order: [
//             [Sequelize.fn('date', Sequelize.col('date')), 'DESC'],
//             [Sequelize.fn('time', Sequelize.col('arrival')), 'DESC'],
            
//          ],
//       })
//       if (page) {
//          visitor = visitor.slice((10 * page) - 10, 10 * page)
//       }
//       console.log(visitor)
//       if (visitor.length > 0){
//          return res.status(200).send({
//             statusCode: 200,
//             page: page,
//             per_page: per_page,
//             total_records: count,
//             total_pages: total_pages,
//             showing_from: from + 1,
//             to: to,
//             visitor: visitor
//          })
//       }
      
//       if (count === 0){
//          return res.status(200).send({
//             message: 'No record found for this request',
//          })
//       }
//    } catch (err) {
//       console.log(err)
//       return res.status(500).send({ message: err.message })
//    }
// });
// // Fetch visitors' History
// router.get('/allvisitors/', authentication, async (req, res) => {
//    try {
//       const start_date = (req.query.start_date) || "2022-10-01";
//       const end_date = (req.query.end_date) || moment().format("YYYY-MM-DD");
//       const search = req.query.search;
//       let name_purpose_search = []
//       if (search) {
//          name_purpose_search.push({
//             [Op.or]: [
//                { first_name: { [Op.like]: `%${search}%` } },
//                { last_name: { [Op.like]: `%${search}%` } },
//                { purpose: { [Op.like]: `%${search}%` } },
//                { host: { [Op.like]: `%${search}%` } },
//             ],
//          });
//       }
//       const count = await Visitor.count({
//          where: {
//             departure: { [Op.not]: null },
//             [Op.and]: [
//                ...name_purpose_search,
//                Sequelize.literal(`date BETWEEN '${start_date}' AND '${end_date}'`),
//             ],
//          }
//       });
//       let per_page;
//       if (count < 10){
//          per_page = count
//       }
//       if (count > 9){
//          per_page = 10
//       }
      
//       const page = parseInt(req.query.page) || 1;
//       const from = (page - 1) * per_page;
//       const to = page * per_page
//       const total_pages = Math.ceil(count / per_page);
      
//       let visitor = await Visitor.findAll({
//          where: {
//             departure: { [Op.not]: null },
//             [Op.and]: [
//                ...name_purpose_search,
//                Sequelize.literal(`date BETWEEN '${start_date}' AND '${end_date}'`),
//             ],
//          },
//          include: [{
//             model: Device
//          }],
//          order: [
//             // [Sequelize.fn('time', Sequelize.col('createdAt')), 'DESC'],
//             [Sequelize.fn('time', Sequelize.col('departure')), 'DESC'],
//             [Sequelize.fn('date', Sequelize.col('date')),'DESC']            
//          ]
//       })
//       if (page) {
//          visitor = visitor.slice((10 * page) - 10, 10 * page)
//       }
//       if (visitor.length > 0) {
//          return res.status(200).send({
//             statusCode: 200,
//             page: page,
//             per_page: per_page,
//             total_records: count,
//             total_pages: total_pages,
//             showing_from: from + 1,
//             to: to,
//             visitor: visitor
//          })
//       } if (count === 0) {
//          return res.status(404).send({
//             message: 'No record found for this request',
//          })
//       }
//    } catch (err) {
//       console.log(err)
//       return res.status(500).send({ message: err.message })
//    }
// });

// //Get visitor By ID
// router.get('/:id', authentication, async (req, res) => {
//    const visitor_id = req.params.id
//    try {
//       const visitor = await Visitor.findOne({
//          where: { visitor_id },
//          include: [{
//             model: Device,
//          }]
//       });
//       if(!visitor) {
//          return res.status(404).send({
//             statusCode: 404,
//             message: "Cannot find record, it must have been deleted. ",
//          })
//       }
//       if (visitor) {
//          return res.status(200).json(visitor)
//       }
//    } catch (err) {
//       console.log(err)
//       return res.status(500).send({
//          statusCode: 500,
//          message: "Cannot find records", err
//       })
//    }
// })

//Delete visitor record
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
