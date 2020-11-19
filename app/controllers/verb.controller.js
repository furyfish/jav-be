const db = require("../models");
const Verb = db.verb;

// Retrieve a random Verb from the database.
exports.findOneOrderByRandom = (req, res) => {
    Verb.findAll({ order: db.Sequelize.literal('rand()'), limit: 1 })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving verb."
            });
        });
};

// Retrieve all Verbs from the database.
exports.findAll = (req, res) => {
    Verb.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving verbs."
            });
        });
};

// Create and Save a new Verb
exports.create = (req, res) => {

};

// Find a single Verb with a customerId
exports.findOne = (req, res) => {

};

// Update a Verb identified by the customerId in the request
exports.update = (req, res) => {

};

// Delete a Verb with the specified customerId in the request
exports.delete = (req, res) => {

};

// Delete all Verbs from the database.
exports.deleteAll = (req, res) => {

};
