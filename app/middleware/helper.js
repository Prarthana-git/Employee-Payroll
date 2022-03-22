const jwt = require('jsonwebtoken');
require('dotenv').config();
class Helper {
  generateToken(loginInput) {
    const token = jwt.sign({ loginInput }, process.env.TOKEN_GENERATE, {
      expiresIn: '30000s'
    });
    return token;
  }
  verifyToken(req, res, next) {
    let token = req.get('token');
    if (token) {
      jwt.verify(token,process.env.TOKEN_GENERATE, (error)=>{
        if (error) {
          return res.status(400).send({
            success: false,
            message: "Inavalid token!"
          })
        }
        else { next(); }
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