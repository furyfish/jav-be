const db = require("../models");
const Form = db.form;

// Retrieve all Forms from the database.
exports.findAll = (req, res) => {
    Form.findAll()
        .then(data => {
            let group1 = [];
            let group2 = [];
            let group3 = [];
            let group4 = [];
            data.forEach(function(form) {
                switch (form.group) {
                    case 1:
                        group1.push(form);
                        break;
                    case 2:
                        group2.push(form);
                        break;
                    case 3:
                        group3.push(form);
                        break;
                    case 4:
                        group3.push(form);
                        break;
                    default:
                        break;
                }
            });

            let index1 = getRandomNumberInRange(0, 1);
            let index2 = getRandomNumberInRange(0, 1);
            group1[index1];
            group2[index2];
            if (index1 == 0 || index2 == 0) {
                let index3 = getRandomNumberInRange(0, 1);
                group3[index3];
            }
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving forms."
            });
        });
};

function getRandomNumberInRange(min, max) {
    return Math.random() * (max - min) + min;
}
