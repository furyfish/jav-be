module.exports = app => {
    const authentication = require("../controllers/authentication.controller.js");

    let router = require("express").Router();

    // Login
    router.post("/login", authentication.login);

    // Logout
    router.post("/logout", authentication.logout);

    app.use('/api/authentication', router);
};
