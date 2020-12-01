const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.options('*', cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// Add headers
app.use(function (req, res, next) {

        var allowedOrigins = ['http://localhost:4200', 'http://localhost', 'http://35.247.142.242', 'http://jav4u.tk', 'http://www.jav4u.tk'];

        var origin = req.headers.origin;

        if (allowedOrigins.indexOf(origin) > -1) {
            res.setHeader('Access-Control-Allow-Origin', origin);
        }

        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        res.setHeader('Access-Control-Allow-Credentials', true);

        next();
    }
);

const db = require("./app/models");
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome to jav application."});
});

require("./app/routes/verb.routes")(app);
require("./app/routes/form.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
