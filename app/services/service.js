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
    userModel.loginUser(loginInfo, (err, data) => {
      if (data) {
        bcrypt.compare(loginInfo.password, data.password, (err, data) => {
          if (err) {
            callback(err, null);
          } console.log(data);
          if(data){
               console.log('data');
            const token=help.generateToken(loginInfo);
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