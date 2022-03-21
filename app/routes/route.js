const userController = require('../controller/controller');
const helper=require('../middleware/helper')
const employee=require('../controller/employee');
module.exports = (app) => {
 
// api for register user
app.post('/register', userController.register);

// api for login user
app.post('/login',userController.login);

app.post('/addEmployee',helper.verifyToken,employee.createEmployee);
};