const { authRegister, authLogin } = require('../middleware/validation.js')
const auth = require('../middleware/helper');
const userService = require('../services/service.js');
class Controller {
    register(req, res) {
        try {
            const user = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            };
            const registerValidation = authRegister.validate(user);
            if (registerValidation.error) {
                res.status(400).send({
                    success: false,
                    message: 'Please Enter Valid Fields',
                    data: registerValidation
                });
                return;
            }
            userService.registerUser(user, (error, data) => {
                if (error) {
                    return res.status(409).json({
                        success: false,
                        message: 'User already exist'
                    });
                } else {
                    return res.status(201).json({
                        success: true,
                        message: 'User Registered',
                        data: data
                    });
                }
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error While Registering',
                data: null
            });
        }
    }
    login(req, res) {
        try {
            const loginInfo = {
                email: req.body.email,
                password: req.body.password
            };
            const loginValidation = authLogin.validate(loginInfo);
            if (loginValidation.error) {
                res.status(400).send({
                    success: false,
                    message: 'please check inserted fields',
                    data: loginValidation
                });
                return;
            }
            userService.loginUser(loginInfo, (error, data) => {
                if (error) {
                    return res.status(403).json({
                        success: false,
                        message: 'please check email and password',
                        error
                    });
                } else {
                    return res.status(200).json({
                        success: true,
                        message: 'User successfully logined In',
                        token: auth.generateToken(data)
                    });
                }
            });
        } catch (error) {
            return res.status(500).send({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}
module.exports = new Controller();