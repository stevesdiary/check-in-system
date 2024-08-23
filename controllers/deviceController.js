const {v4: uuidv4 } = require('uuid');
const { Device } = require('../models');

const deviceController = {
	createDevice: async (req, res) => {
		let newDevice = req.body
		// let email = req.body.visitor_email
		const gadget_type = req.body.gadget_type
		const serial_number = req.body.serial_number
		const product_name = req.body.product_name
		const device_id = uuidv4()
		newDevice.gadget_type= gadget_type
		newDevice.product_name = product_name
		newDevice.serial_number= serial_number
		newDevice.device_id = device_id 
		try{
			 // const visitor = await Visitor.findOne({ where: { email }})
			 // visitor.visitor_id =  visitor_id
			const device = await Device.create(newDevice)
			// console.log(newDevice)
			 // console.log(visitor_id)
			return res.status(201).send({ 
				statusCode: 201,
				message: 'Awesome, device added successfully!'
			})
		}catch(err){
				console.log(err)
				return res.status(500).json(err)
		};
  },
	
	getDevices: async (req, res) => {
		try {
			const device = await Device.findAll({});
			return res.status(200).send({
				statusCode: 200,
				message: "Successful!",
				device
			});	
		} catch(err){
			console.log(err)
			return res.status(500).send("Cannot get device, there's a problem");
		}
	},

	updateDevice: async (req, res) => {
		const device_id = req.params.id
		const {gadget_type, visitor_id, product_name, serial_number} = req.body
		try{
			const device = await Device.findOne({ where: { device_id }})
					device.visitor_id = visitor_id
					device.gadget_type = gadget_type
					device.product_name = product_name
					device.serial_number = serial_number

					await device.save()
			
			console.log("Device updated successfully ")
			return res.status(200).send({
					statusCode: 200,
					message: "Device updated successfully"
			})
			
		}catch(err){
			console.log(err)
			return res.status(500).status(500).json(err)
		}
  },

	deleteDevice: async (req, res) =>{
		const device_id = req.params.id
		try {
			await Device.destroy({ where: { device_id } })

			return res.status(200).send({
					statusCode: 200,
					message: "Device deleted successfully"
			});
		
		} catch(err){
				console.log(err)
				return res.status(500).send({
					statusCode: 500,
					message: "Aww snag! Problem with deleting device.", err 
			})
		}
	},
}

module.exports = deviceController;