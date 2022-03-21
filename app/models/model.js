const mongoose = require("mongoose");
const bcrypt=require('bcrypt')
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z ]{3,30}$/
    },
    lastName: {
        type: String,
        required: true,
        validate: /^[a-zA-Z ]{3,30}$/
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate:/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9]+[.]+[a-zA-Z]+$/ 
    },
    password: {
        type: String,
        required: true,
        minlength: 8

    },
});
 /**
 * @description     : It is converting password content to a encrypted to form using pre middleware
 *                    of mongoose and bcrypt npm package.
 * @middleware      : pre is the middleware of mongoose schema
 * @package         : bcrypt is used to encrpt the password we are getting from client side
*/

userSchema.pre('save', async function (next) {
    try {
      // generate a salt
      const salt = await bcrypt.genSalt(10);
      // hash the password along with our new salt
      const hashedPassword = await bcrypt.hash(this.password, salt);
      // override the cleartext password with the hashed one
      this.password = hashedPassword;
      next();
    } catch (error) {
      next(error);
    }
  });
const User = mongoose.model("user", userSchema);

class UserModel {
    registerUser(userDetails, callback) {
        const newUser = new User({
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            email: userDetails.email,
            password: userDetails.password
        });
        newUser.save((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }
    
    loginUser (loginData, callback) {
        User.findOne({ email: loginData.email }, (error, data) => {
          if (error) {
            return callback(error, null);
          } else if (!data) {
            return callback(new Error('Invalid Credentials'), null);
          } else {
            return callback(null, data);
          }
        });
      }
};
// exporting the class
module.exports = new UserModel();
