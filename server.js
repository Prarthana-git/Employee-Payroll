const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerDocument = require("./swagger/swagger.json");
const {redisDatabase} = require('./config/redis');
require("dotenv").config();
//create express app
const app = express();

//parsing the request from user
app.use(express.urlencoded({ extended: true }));

//parse the request from user
app.use(express.json());
redisDatabase();
// Configuring the database
const dbConfig = require("./config/database.config.js");
dbConfig.dbConnectiom();
// app.get('', (req, res) => {
//     res.json({ "message": 'Welcome to Employee Payrall Application' });

// })

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
require("./app/routes/route.js")(app);

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
module.exports = app;
