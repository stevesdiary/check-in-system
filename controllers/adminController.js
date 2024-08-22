const express = require('express');
const app = express();
const helmet = require('helmet');
app.use(helmet());
const {v4: uuidv4 } = require('uuid');
const { Admin, Visitor, Device } = require('../models');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const bcrypt = require('bcryptjs');
const env = process.env.NODE_ENV || 'development';
const saltRounds = bcrypt.genSaltSync(11);
const nodemailer = require('nodemailer');

const adminController = {
	createUser: async (req, res) => {
		const admin_id = uuidv4()
		const { first_name, last_name, email, password, confirmPassword, role } = req.body;

		const admin = await Admin.findOne({
			where: {email: email},
			 // defaults: { 
			 //    admin_id: admin_id,
			 //    first_name: first_name,
			 //    last_name: last_name,
			 //    role: role,
			 //    password: hashed,
			 // }
		}) 
		const hashed = await bcrypt.hash(password, saltRounds)
		try{
			if (admin){
					console.log('User already exists')
					return res.status(400).send(`User ${admin.first_name} already exists, log in with email and password.`);
			}
			if(password !== confirmPassword){
				return res.status(403).send("Password do not match")
			}
			const newAdmin = await Admin.create({
			admin_id,
			first_name,
			last_name,
			email,
			password : hashed,
			role : role
		});
		
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.SENDER_EMAIL,
				pass: process.env.EMAIL_PASSWORD
			}
		})

		const mailOptions = {
			from: process.env.SENDER_EMAIL,
			to: email,
			subject: 'Welcome to Aella check-in service',
			html: `You have been registered on Aella check-in system, you can sign in with your email ${ email } and password here : ${process.env.LOGIN_URL}`
		};
		await transporter.sendMail(mailOptions);
			console.log('Profile created and Email sent');
			return res.status(200).send(`Awesome! User: ${email} has been created successfully.`);
		}catch(err){
			console.log(err)
			return res.status(500).json({
				message: "There's an error!", Error: err
			});
		}
  },

	getAllAdmin: async (req, res) =>{
		try {
			const count = await Admin.count();
			const per_page = 10
			const page = parseInt(req.query.page);
			const offset = (page - 1) * per_page
			const total_pages = Math.ceil(count / per_page);
			 // const has_more = page < Math.ceil(total_pages / per_page);
			 // const hasPrevious = page > 1;
			 // console.log("Total pages: ", count, total_pages, "page :", page )
			 // console.log("page: ", parseInt(req.query.page))   
			const admin = await Admin.findAll({
				order: [['createdAt', 'DESC']],
				offset: offset,
				limit: per_page,
				include: [{
					model: Visitor, 
					include: [{ 
						model: Device }]
				}],
				// pagination_data:{}
			})
			return res.status(200).send({
				page: page,
				per_page: per_page,
				total_records: count,
				total_pages: total_pages,
				showing_from: offset + 1,
				admin: admin,
			})
		} catch(err){
			console.log(err)
			return res.status(500).json({error: err.message, })
		}
  },

	getOneAdmin: async (req, res) => {
		const email = req.params.email
		try {
			const admin = await Admin.findOne({
					where: {email},
					include: [{
						model: Visitor, 
						include: [ {
							model: Device
						} ]
					}],
			})

			return res.send(admin)
		} catch(err){
			console.log(err, "Something went wrong")
			return res.status(500).json({error: err.message, })
		}
  },

	updateAdmin: async (req, res) => {
		const admin_id = req.params.id
		const {first_name, last_name, email, role } = req.body
		// const password = req.body.password;
		// const hashed = await bcrypt.hash(password, saltRounds)
		try{
			const admin = await Admin.findOne({ where: { admin_id }})
			if(admin){
					// admin.admin_id = admin_id,
				admin.email = email,
				admin.first_name = first_name,
				admin.last_name = last_name,
				admin.role = role,
				await admin.save()
			
				console.log( "Records of " + email + " has been updated successfully!")
				return res.status(200).send({
					statusCode: 200,
					message: "Records for " + email + " has been updated successfully!"
				})
			}else{
			return res.status(404).send({ 
				statusCode: 404, 
				message: "Record not found for " + email + ". Check your credentials."});
			}
		}catch(err){
			console.log(err)
			return res.status(500).send({
				statusCode: 500,
				message: "Cannot update records, there's an error. ", err 
			})
		}
  },

	deleteAdmin: async (req, res) =>{
		const email = req.params.email;
		const admin = await Admin.findOne({where: {email}})
		try {
			await Admin.destroy({ where: { email } })
			return res.status(200).send({
				statusCode: 200,
				message: "Admin profile for user: " + email + " has been deleted successfully"
			});
		} catch(err){
			console.log(err)
			return res.status(500).send("Problem with deleting records for " + email);
		}
  }
};

module.exports = adminController;