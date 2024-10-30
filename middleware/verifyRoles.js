const verifyRoles = (allowedRoles) => {
  return (req, res, next) => {
      try{
        if (allowedRoles.includes(req.roles)){
        next();
      } else{
        res.status(401).send({
            statusCode: 401,
            message: 'You are NOT authorised to access this route!'
        })
      }
      }catch(err){
        return res.status(500).send({message: err?.message})
      }
  }
}
module.exports = verifyRoles
