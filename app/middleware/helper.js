const jwt= require('jsonwebtoken');
require  ('dotenv').config();
class Helper{
    generateToken (loginInput) {
        const token = jwt.sign({ loginInput }, process.env.TOKEN_GENERATE, {
          expiresIn: '30000s'
        });
        return token;
      }
}
module.exports = new Helper();