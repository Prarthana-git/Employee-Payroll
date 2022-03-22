const userController = require('../controller/controller');
const helper=require('../middleware/helper')
const employee=require('../controller/employee');
module.exports = (app) => {
 
// api for register user
app.post('/register', userController.register);

// api for login user
app.post('/login',userController.login);

//CRUD api for employee
app.post('',helper.verifyToken,employee.createEmployee);
app.get('',helper.verifyToken,employee.getAllEmployees);
app.get('/:empId',helper.verifyToken,employee.getOne);
app.put('/:empId',helper.verifyToken,employee.updateEmployee);
app.delete('/:empId', helper.verifyToken, employee.removeEmployee);
};