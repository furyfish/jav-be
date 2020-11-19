module.exports = app => {
    const verb = require("../controllers/verb.controller.js");

    var router = require("express").Router();

    // Retrieve a random Verb
    router.get("/one", verb.findOneOrderByRandom);

    // Retrieve all Verbs
    router.get("/all", verb.findAll);

    // Create a new Verb
    router.post("/", verb.create);

    // Retrieve a single Verb with verbId
    router.get("/:verbId", verb.findOne);

    // Update a Verb with verbId
    router.put("/:verbId", verb.update);

    // Delete a Verb with verbId
    router.delete("/:verbId", verb.delete);

    app.use('/api/verb', router);
};
