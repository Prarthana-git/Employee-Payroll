const express = require('express');
//create express app
const app = express();

//parsing the request from user
app.use(express.urlencoded({ extended: true }))

//parse the request from user
app.use(express.json())
// Configuring the database
const dbConfig = require('./config/database.config.js');
dbConfig.dbConnectiom();
app.get('/', (req, res) => {
    res.json({ "message": 'Welcome to Employee Payrall Application' });

})
require('./app/routes/route.js')(app);
app.listen(4000, () => {
    console.log('Server is listening on port 4000')
})