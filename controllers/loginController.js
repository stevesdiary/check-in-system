const { Admin } = require('../models'); 
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const loginController = async (req, res) =>{
	const { email, password} = req.body;
	const userEmail = await Admin.findOne({where: {email: email}}).catch((err) => {
		console.log('Errror: ', err);
	});

	if(!userEmail){
		return res.status(404).send({ Message: 'Email not found!'});
		const match = await bcrypt.compare(password, userEmail.password);
	}
	if (!match){
		return res.status(401).send({ Message: 'Password is incorrect!'});
	}

	//const email = userEmail.email;
	const admin = await Admin.findOne({where: { email }})
	const admin_id = admin.admin_id;
	const first_name = admin.first_name
	const last_name = admin.last_name
	const role = admin?.role
	const accessToken = jwt.sign( {
		exp: Math.floor(Date.now() / 1000) + (60*60*10),
		UserInfo: {
				admin_id: admin_id, 
				email: userEmail.email,
				role: admin.role
		}}, process.env.JWT_SECRET);

	return res.status(200).json({
		statusCode: 200,
		visitor_id: admin.visitor_id,
		first_name: first_name, 
		last_name: last_name, 
		role: role, 
		token: accessToken });

};

module.exports = loginController;