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
                    let result1 = "";
                    let result2 = "";

                    if (idx3 == 0) {    // tu dien
                        result1 = verb[0].kanji;
                        let lastCharacter = result1.charAt(result1.length - 1);
                        if (idx1 == 0) {    // qua khu
                            if (idx2 == 0) {    // phu dinh
                                result1 = replaceLastCharacter(result1, convertToVNai(lastCharacter)).concat("なかった");
                            } else {    // khang dinh
                                switch (verb[0].group) {
                                    case 1:
                                        switch (lastCharacter) {
                                            case "う":
                                            case "つ":
                                            case "る":
                                                result1 = replaceLastCharacter(result1, "った");
                                                break;
                                            case "む":
                                            case "ぶ":
                                            case "ぬ":
                                                result1 = replaceLastCharacter(result1, "んた");
                                                break;
                                            case "す":
                                                result1 = replaceLastCharacter(result1, "した");
                                                break;
                                            case "く":
                                                result1 = replaceLastCharacter(result1, "いた");
                                                break;
                                            case "ぐ":
                                                result1 = replaceLastCharacter(result1, "いだ");
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
                                        result1 = replaceLastCharacter(result1, "った");
                                        break;
                                    default:
                                        break;
                                }
                            }
                        } else {    // hien tai
                            if (idx2 == 0) {    // phu dinh
                                result1 = replaceLastCharacter(result1, convertToNaiForm(lastCharacter));
                            } else {    // khang dinh
                                result1 = result1;
                            }
                        }
                    } else {    // lich su
                        result1 = verb[0].kanji;
                        let lastCharacter = result1.charAt(result1.length - 1);
                        result1 = replaceLastCharacter(result1, convertToVMasu(lastCharacter));
                        if (idx1 == 0) {    // qua khu
                            if (idx2 == 0) {    // phu dinh
                                result1 = result1.concat("ませんでした");
                            } else {    // khang dinh
                                result1 = replaceLastCharacter(result1, convertToMasuForm(lastCharacter));
                            }
                        } else {
                            convertToVMasu
                            if (idx2 == 0) {    // phu dinh
                                result1 = result1.concat("ません");
                            } else {    // khang dinh
                                result1 = result1.concat("ます");
                            }
                        }
                    }

                    // set form name
                    jisho = "";
                    result2 = result1.replace(/^./, verb[0].furigana);
                    const verbDTO = new VerbDTO(verb[0].id, verb[0].kanji, verb[0].furigana, verb[0].vietnamese, verb[0].english, verb[0].group, jisho, form1, form2, form3, result1, result2);

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

function convertToVMasu(charToConvert) {
    var input = 'うくすつぬふむるぐずづぶぷ';
    var output = 'いきしちにひみりぎじぢびぴ';
    var idx = input.indexOf(charToConvert);
    if (idx < 0) {
        return charToConvert;
    }
    return output.charAt(idx);
}

function convertToMasuForm(charToConvert) {
    return convertToVMasu(charToConvert).concat("ます");
}

function convertToVNai(charToConvert) {
    var input = 'うくすつぬふむゆるぐずづぶぷ';
    var output = 'わかさたなはまやらがざだばぱ';
    var idx = input.indexOf(charToConvert);
    if (idx < 0) {
        return charToConvert;
    }
    return output.charAt(idx);
}

function convertToNaiForm(charToConvert) {
    return convertToVNai(charToConvert).concat("ない");
}

function replaceLastCharacter(string, replaceWith) {
    return string.replace(/.$/, replaceWith);
}
