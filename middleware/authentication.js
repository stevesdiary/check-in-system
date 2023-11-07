const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET


const authentication = async (req, res, next) => {
   const email = req.headers.email
   require('dotenv').config();
   let token = req.headers.authorization
   if (!token) {
      return res.send("Provide correct token first!")
   }
   token = token.split(' ')[1]
   if(token == null || token !== token){ 
      return res.status(401).json({message: 'Unauthorized or wrong token!'})
   }
   try{
      const decoded = jwt.verify(token, secret);
      
      if(decoded.UserInfo){
         req.user = decoded.UserInfo.email;
         req.roles = decoded.UserInfo.role;
         // console.log("user role ", req.roles, req.user);
         next();
      }else{
         res.status(403).send({
            message: 'Invalid token, or some error occurred'
         })
      }
   }catch(err) {
      console.log({ err })
      return res.send({err})
   }
}; 

module.exports = { authentication };
