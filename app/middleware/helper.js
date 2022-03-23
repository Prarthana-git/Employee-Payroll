const { header } = require('express/lib/request');
const jwt = require('jsonwebtoken');
require('dotenv').config();
class Helper {
  generateToken(loginInput) {
    console.log("loginInput", loginInput);
    const token = jwt.sign({ "id": loginInput._id }, process.env.TOKEN_GENERATE)
    return token;
  }
  verifyToken(req, res, next) {
    let token = req.header('token');
    if (token) {
      const result = jwt.verify(token, process.env.TOKEN_GENERATE)
      if (result) {
        console.log("data", result)
        req.body.userId = result.id;
        // console.log("req.body", req.body);
        next();
    }
    else {
       return res.status(400).send({
        success: false,
        message: "Inavalid token!"
      })
     }
    } else {
  return res.status(401).send({
    success: false,
    message: 'Authorized token is required',
  })
}
}
}
module.exports = new Helper();