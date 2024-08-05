const { UUID } = require("sequelize");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const { Device, Admin, Visitor, Sequelize } = require("../models");
const Op = Sequelize.Op;
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

visitorController = {
  createVisitor: async (req, res) => {
    const devices = req.body.devices;
    let token = req.headers.authorization;
    if (!token) {
      return res.send("Provide correct token first!");
    }
    token = token.split(" ")[1];
    const decoded = jwt.verify(token, secret);
    email = decoded.UserInfo.email;
    const now = moment()
    let newVisitor = req.body;
    const {first_name, last_name, company_name } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    const visitor_id = uuidv4();
    admin_id = admin.admin_id;
    newVisitor.admin_id = admin_id;
    newVisitor.arrival = moment(now).format('LT');
    newVisitor.date = moment().format('LL');
    newVisitor.visitor_id = visitor_id;
    newVisitor.company_name = company_name;
    try {
      const result = await Visitor.create(newVisitor);
    } catch (err) {
      return res.status(500).send({
          statusCode: 500,
          message: "An error has occured, unable to create record.",
          err,
      });
    }
    if (Array.isArray(devices)) {
      try {
          for (let i = 0; i < devices.length; i++) {
            let deviceslogs = [];
            const gadget_type = devices[i].gadget_type;
            const product_name = devices[i].product_name;
            const serial_number = devices[i].serial_number;
            if (
              gadget_type.length > 1 ||
              product_name.length > 1 ||
              serial_number.length > 1
            ) {
                const device_id = uuidv4();
                const visitor_id = newVisitor.visitor_id;
                req.body.devices[i].device_id = device_id;
                req.body.devices[i].visitor_id = visitor_id;
                const newRecord = {
                  device_id: device_id,
                  gadget_type: gadget_type,
                  serial_number: serial_number,
                  product_name: product_name,
                  visitor_id: visitor_id,
                };
                deviceslogs.push(newRecord);
            } else {
                return res.send({
                  statusCode: 201,
                  message:
                    `Records for ${first_name} ${last_name} have been created successfully!`,
                  devices: null,
                  visitor_id: visitor_id,
                });
              }
          }
          const result = await Device.bulkCreate(req.body.devices).then(() => {
            return res.status(201).send({
              statusCode: 201,
              message:
                `Records for ${first_name} ${last_name} have been created successfully!`,
              visitor_id: visitor_id,
            });
          });
      } catch (err) {
          console.log(err);
          return res
            .status(500)
            .send({ message: "Something went wrong ", error: err.message });
      }
    }
  },

  currentVisitor: async (req, res) => {
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
          [Op.and]: [
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
 },


};
module.exports = visitorController;