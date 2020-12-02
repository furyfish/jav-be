const db = require("../models");
const Verb = db.verb;
const Form = db.form;
const Tense = db.tense;
const Type = db.type;

const VerbDTO = require("../dtos/verb.dto");

// Retrieve a random Verb from the database.
exports.findRandom = async (req, res) => {
    var forms = new Map();
    var tenses = new Map();
    var types = new Map();

    let data = await Form.findAll();
    data.forEach(form => {
        forms.set(form.id, form);
    });

    data = await Tense.findAll();
    data.forEach(tense => {
        tenses.set(tense.id, tense);
    });

    data = await Type.findAll();
    data.forEach(type => {
        types.set(type.id, type);
    });

    let verb = await Verb.findAll({order: db.Sequelize.literal('rand()'), limit: 1});

    // calc result
    let result1 = '';
    let result2 = '';
    let lastCharacter = '';
    var form = '';
    var tense = '';
    var type = '';
    let weight = getRandomNumberInRange(1, 8);

    switch (weight) {
        case 1: // tu dien + qua khu + khang dinh
            form = forms.get(1);
            tense = tenses.get(2);
            type = types.get(1);
            type = '';
            result1 = verb[0].kanji;
            lastCharacter = result1.charAt(result1.length - 1);
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
            break;
        case 2: // tu dien + qua khu + phu dinh
            form = forms.get(1);
            tense = tenses.get(2);
            type = types.get(2);
            result1 = verb[0].kanji;
            lastCharacter = result1.charAt(result1.length - 1);
            result1 = replaceLastCharacter(result1, convertToVNai(lastCharacter)).concat("なかった");
            break;
        case 3: // tu dien + hien tai/tuong lai + khang dinh
            form = forms.get(1);
            tense = tenses.get(1);
            type = types.get(1);
            result1 = verb[0].kanji;
            break;
        case 4: // tu dien + hien tai/tuong lai + phu dinh
            form = forms.get(1);
            tense = tenses.get(1);
            type = types.get(2);
            result1 = verb[0].kanji;
            lastCharacter = result1.charAt(result1.length - 1);
            result1 = replaceLastCharacter(result1, convertToNaiForm(lastCharacter));
            break;
        case 5: // lich su + qua khu + khang dinh
            form = forms.get(2);
            tense = tenses.get(2);
            type = types.get(1);
            result1 = verb[0].kanji;
            lastCharacter = result1.charAt(result1.length - 1);
            result1 = replaceLastCharacter(result1, convertToVMasu(lastCharacter));
            result1 = replaceLastCharacter(result1, convertToMasuForm(lastCharacter));
            break;
        case 6: // lich su + qua khu + phu dinh
            form = forms.get(2);
            tense = tenses.get(2);
            type = types.get(2);
            result1 = verb[0].kanji;
            lastCharacter = result1.charAt(result1.length - 1);
            result1 = replaceLastCharacter(result1, convertToVMasu(lastCharacter));
            result1 = result1.concat("ませんでした");
            break;
        case 7: // lich su + hien tai/tuong lai + khang dinh
            form = forms.get(2);
            tense = tenses.get(1);
            type = types.get(1);
            result1 = verb[0].kanji;
            lastCharacter = result1.charAt(result1.length - 1);
            result1 = replaceLastCharacter(result1, convertToVMasu(lastCharacter));
            result1 = result1.concat("ます");
            break;
        case 8: // lich su + hien tai/tuong lai + phu dinh
            form = forms.get(2);
            tense = tenses.get(1);
            type = types.get(2);
            result1 = verb[0].kanji;
            lastCharacter = result1.charAt(result1.length - 1);
            result1 = replaceLastCharacter(result1, convertToVMasu(lastCharacter));
            result1 = result1.concat("ません");
            break;
        default:
            break;
    }

    // set form name
    jisho = "";
    result2 = result1.replace(/^./, verb[0].furigana);
    const verbDTO = new VerbDTO(verb[0].id, verb[0].kanji, verb[0].furigana, verb[0].vietnamese, verb[0].english, verb[0].group, jisho, form, tense, type, result1, result2);

    res.send(verbDTO);
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
