const express = require("express");
const cors = require("cors");
const session = require('express-session');
const bodyParser = require("body-parser");

const app = express();

app.use(cors());

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'adbc1234',
    cookie: { secure: true }}));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

const db = require("./app/models");
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to jav application."});
});

require("./app/routes/verb.routes")(app);
require("./app/routes/authentication.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
