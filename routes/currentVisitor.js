const express = require('express');
const router = express.Router();
const app = express();
const { Device, Admin, Visitor, Sequelize } = require('../models');
const Op = Sequelize.Op;
const { authentication } = require('../middleware/authentication');
const verifyRoles = require('../middleware/verifyRoles');
const roles_list = require('../config/roles_list');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

router.get('/', authentication, async (req, res) => {
   try {
      const search = req.query.search;
      let name_purpose_search = []
      if (search) {
         name_purpose_search.push(
            {
               [Op.or]: [
                  { first_name: { [Op.like]: `%${search}%` } },
                  { last_name: { [Op.like]: `%${search}%` } },
                  { purpose: { [Op.like]: `%${search}%` } }
               ]
            },
         )
      }
      const count = await Visitor.count({
         where: {
            departure: { [Op.eq]: null },
         [Op.and]:  [
            ...name_purpose_search
         ],
         }
      });
      let per_page;
      if (count < 10) {
         per_page = count
      } if (count > 9) {
         per_page = 10
      }
      const page = parseInt(req.query.page) || 1;
      const from = (page - 1) * per_page;
      const to = page * per_page;
      const total_pages = Math.ceil(count / per_page);
      
      let visitor = await Visitor.findAll({
         where: {
            departure: { [Op.eq]: null },
         [Op.and]:  [
            ...name_purpose_search
         ],
         },
         include: [{
            model: Device
         }],
         page: { [Op.eq]: `${page}` },
         order: [
            [Sequelize.fn('date', Sequelize.col('date')), 'DESC'],
            [Sequelize.fn('time', Sequelize.col('arrival')), 'DESC']            
         ],
      })
      if (page) {
         visitor = visitor.slice((10 * page) - 10, 10 * page)
      }
      // console.log(visitor)
      if (visitor.length > 0){
      return res.status(200).send({
         statusCode: 200,
         page: page,
         per_page: per_page,
         total_records: count,
         total_pages: total_pages,
         showing_from: from + 1,
         to: to,
         visitor: visitor
      })

      }if (count === 0){
         return res.status(200).send({
            message: 'No record found for this request',
         })
      }
   } catch (err) {
      console.log(err)
      return res.status(500).send({ message: err.message })
   }
});

module.exports = router;