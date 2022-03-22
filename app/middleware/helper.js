const { header } = require('express/lib/request');
const jwt = require('jsonwebtoken');
require('dotenv').config();
class Helper {
  generateToken(loginInput) {
    // console.log("loginInput",loginInput);
    const token = jwt.sign({ email:loginInput.email}, process.env.TOKEN_GENERATE, {
      expiresIn: '30000s'
    });
    return token;
  }
  verifyToken(req, res, next) {
    let token = req.header('token');
    if (token) {
      jwt.verify(token,process.env.TOKEN_GENERATE, (error,data)=>{
        if (error) {
          return res.status(400).send({
            success: false,
            message: "Inavalid token!"
          })
        }
        else{
          console.log("data",data)
          req.body.email=data.email;
          // console.log("req.body.email",req.body.email);
           next(); }
      })
    } else {
      return res.status(401).send({
        success: false,
        message: 'Authorized token is required',
      })
    }
  }
}
module.exports = new Helper();