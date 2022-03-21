const userController = require('../controller/controller');
module.exports = (app) => {
 
// api for register user
app.post('/register', userController.register);

app.post('/login',userController.login);
};