module.exports = app => {
    const authentication = require("../controllers/authentication.controller.js");

    let router = require("express").Router();

    // Login
    router.get("/login", authentication.login);

    // Logout
    router.get("/logout", authentication.logout);

    app.use('/api/authentication', router);
};
