module.exports = app => {
    const verb = require("../controllers/verb.controller.js");

    let router = require("express").Router();

    // Retrieve a random Verb
    router.get("/random", verb.findRandom);

    app.use('/api/verb', router);
};
