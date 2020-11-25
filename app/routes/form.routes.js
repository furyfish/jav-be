module.exports = app => {
    const form = require("../controllers/form.controller.js");

    var router = require("express").Router();

    router.get("/all", form.findAll);

    app.use('/api/form', router);
};
