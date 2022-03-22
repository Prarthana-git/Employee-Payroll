const userModel = require('../models/model.js');
const help=require('../middleware/helper')
const bcrypt = require('bcrypt');

class UserService {
  registerUser(user, callback) {
    userModel.registerUser(user, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  };

  loginUser(loginInfo, callback) {
    userModel.loginUser(loginInfo, (err, result) => {
      if (result) {
        bcrypt.compare(loginInfo.password, result.password, (err, data) => {
          if (err) {
            callback(err, null);
          } 
          if(data){
            const token=help.generateToken(result);
            return callback(null,token); 
          } else {
            callback(new Error('Password does not match'));
          }
        })
      }else {
        callback(err, null);
      }
    })
  }
}
module.exports = new UserService();