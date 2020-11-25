const db = require("../models");
const Verb = db.verb;
const Form = db.form;

const VerbDTO = require("../dtos/verb.dto");

// Retrieve a random Verb from the database.
exports.findRandom = (req, res) => {
    let group1 = [];
    let group2 = [];
    let group3 = [];
    let group4 = [];
    Form.findAll()
        .then(forms => {
            forms.forEach(form => {
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
                        group4.push(form);
                        break;
                    default:
                        break;
                }
            });

            Verb.findAll({order: db.Sequelize.literal('rand()'), limit: 1})
                .then(verb => {
                    let idx1 = getRandomNumberInRange(0, group1.length - 1);
                    let idx2 = getRandomNumberInRange(0, group2.length - 1);
                    var form1 = group1[idx1].name_vn;
                    var form2 = group2[idx2].name_vn;
                    var form3 = "";

                    // if (idx1 == 0 || idx2 == 0) {
                    let idx3 = getRandomNumberInRange(0, group3.length - 1);
                    form3 = group3[idx3].name_vn;
                    // } else {
                    //     let idx3 = getRandomNumberInRange(0, group4.length - 1);
                    //     form3 = group4[idx3].name_vn;
                    // }

                    // calc result
                    let result = "";

                    if (idx3 == 0) {    // tu dien
                        result = verb[0].plain;
                        let lastCharacter = verb[0].plain.charAt(verb[0].plain.length - 1);
                        if (idx1 == 0) {    // qua khu
                            if (idx2 == 0) {    // phu dinh
                                result = replaceLastCharacter(result, convertToVNa(lastCharacter)).concat("なかった");
                            } else {    // khang dinh
                                switch (verb[0].group) {
                                    case 1:
                                        switch (lastCharacter) {
                                            case "う":
                                            case "つ":
                                            case "る":
                                                result = replaceLastCharacter(result, "った");
                                                break;
                                            case "む":
                                            case "ぶ":
                                            case "ぬ":
                                                result = replaceLastCharacter(result, "んた");
                                                break;
                                            case "す":
                                                result = replaceLastCharacter(result, "した");
                                                break;
                                            case "く":
                                                result = replaceLastCharacter(result, "いた");
                                                break;
                                            case "ぐ":
                                                result = replaceLastCharacter(result, "いだ");
                                                break;
                                            default:
                                                break;
                                        }
                                        break;
                                    case 2:
                                        break;
                                    case 3:
                                        break;
                                    case 4:
                                        result = replaceLastCharacter(result, "った");
                                        break;
                                    default:
                                        break;
                                }
                            }
                        } else {    // hien tai
                            if (idx2 == 0) {    // phu dinh
                                result = convertToNaiForm();
                            } else {    // khang dinh
                                result = verb[0].plain;
                            }
                        }
                    } else {    // lich su
                        if (idx1 == 0) {    // qua khu
                            if (idx2 == 0) {    // phu dinh
                                result = verb[0].polite.concat("ませんでした");
                            } else {    // khang dinh
                                result = verb[0].polite.concat("でした");
                            }
                        } else {
                            if (idx2 == 0) {    // phu dinh
                                result = verb[0].polite.concat("ません");
                            } else {    // khang dinh
                                result = verb[0].polite.concat("ます");
                            }
                        }
                    }

                    // set form name
                    const verbDTO = new VerbDTO(verb[0].id, verb[0].plain, verb[0].polite, verb[0].furigana, verb[0].vietnamese, verb[0].english, verb[0].group, form1, form2, form3, result);

                    res.send(verbDTO);
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while retrieving forms."
                    });
                });
        });

};

// Retrieve a random Verb from the database.
exports.findOneOrderByRandom = (req, res) => {
    Verb.findAll({order: db.Sequelize.literal('rand()'), limit: 1})
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

function getRandomNumberInRange(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function convertToVNa(charToConvert) {
    var input = 'うくすつぬふむゆる';
    var output = 'あかさたなはまやら';
    var idx = input.indexOf(charToConvert);
    if (idx < 0) {
        return charToConvert;
    }
    return output.charAt(idx);
}

function convertToNaiForm(charToConvert) {
    return convertToVNa(charToConvert).concat("ない");
}

function replaceLastCharacter(string, replaceWith) {
    return string.replace(/.$/, replaceWith);
}
