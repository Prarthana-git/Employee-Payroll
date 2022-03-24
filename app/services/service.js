const userModel = require("../models/model.js");
const help = require("../middleware/helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserService {
  registerUser(user, callback) {
    userModel.registerUser(user, (err, data) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data);
      }
    });
  }

  loginUser(loginInfo, callback) {
    userModel.loginUser(loginInfo, (err, result) => {
      if (result) {
        bcrypt.compare(loginInfo.password, result.password, (err, data) => {
          if (err) {
            callback(err, null);
          }
          if (data) {
            // const token=help.generateToken(result);
            // console.log("result", result);
            const token = jwt.sign(
              { email: result.email, id: result._id },
              process.env.TOKEN_GENERATE
            );
            callback(null, token);
          } else {
            callback(new Error("Password does not match"));
          }
        });
      } else {
        callback(err, null);
      }
    });
  }
}
module.exports = new UserService();
