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

    var dictionary = req.query.dictionary;
    var polite = req.query.polite;
    var tform = req.query.tform;

    let verb = await Verb.findAll({order: db.Sequelize.literal('rand()'), limit: 1});

    // calc result
    let result1 = verb[0].kanji;
    let result2 = '';
    let lastCharacter = result1.charAt(result1.length - 1);
    let form = '';
    let tense = '';
    let type = '';
    let weight = getRandomNumberInRange(8, 9);

    switch (weight) {
        case 1: // tu dien + qua khu + khang dinh
            form = forms.get(1);
            tense = tenses.get(2);
            type = types.get(1);
            result1 = convertToVTa(verb[0].group, lastCharacter, result1);
            break;
        case 2: // tu dien + qua khu + phu dinh
            form = forms.get(1);
            tense = tenses.get(2);
            type = types.get(2);
            result1 = replaceLastCharacter(result1, convertToVNai(lastCharacter)).concat("なかった");
            break;
        case 3: // tu dien + hien tai/tuong lai + khang dinh
            form = forms.get(1);
            tense = tenses.get(1);
            type = types.get(1);
            break;
        case 4: // tu dien + hien tai/tuong lai + phu dinh
            form = forms.get(1);
            tense = tenses.get(1);
            type = types.get(2);
            result1 = replaceLastCharacter(result1, convertToNaiForm(lastCharacter));
            break;
        case 5: // lich su + qua khu + khang dinh
            form = forms.get(2);
            tense = tenses.get(2);
            type = types.get(1);
            result1 = replaceLastCharacter(result1, convertToMasuForm(lastCharacter));
            break;
        case 6: // lich su + qua khu + phu dinh
            form = forms.get(2);
            tense = tenses.get(2);
            type = types.get(2);
            result1 = replaceLastCharacter(result1, convertToVMasu(lastCharacter));
            result1 = result1.concat("ませんでした");
            break;
        case 7: // lich su + hien tai/tuong lai + khang dinh
            form = forms.get(2);
            tense = tenses.get(1);
            type = types.get(1);
            result1 = replaceLastCharacter(result1, convertToVMasu(lastCharacter));
            result1 = result1.concat("ます");
            break;
        case 8: // lich su + hien tai/tuong lai + phu dinh
            form = forms.get(2);
            tense = tenses.get(1);
            type = types.get(2);
            result1 = replaceLastCharacter(result1, convertToVMasu(lastCharacter));
            result1 = result1.concat("ません");
            break;
        case 9: // the te
            form = forms.get(3);
            result1 = convertToVTe(verb[0].group, lastCharacter, result1);
            break;
        default:
            break;
    }

    // set form name
    result2 = result1.replace(/^./, verb[0].furigana);
    const verbDTO = new VerbDTO(verb[0].id, verb[0].kanji, verb[0].furigana, verb[0].vietnamese, verb[0].english, verb[0].group, '', form, tense, type, result1, result2);

    res.send(verbDTO);
};

function getRandomNumberInRange(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}

function replaceLastCharacter(string, replaceWith) {
    return string.replace(/.$/, replaceWith);
}

function convertToVMasu(charToConvert) {
    var input = "うくすつぬふむるぐずづぶぷ";
    var output = "いきしちにひみりぎじぢびぴ";
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
    var input = "うくすつぬふむゆるぐずづぶぷ";
    var output = "わかさたなはまやらがざだばぱ";
    var idx = input.indexOf(charToConvert);
    if (idx < 0) {
        return charToConvert;
    }
    return output.charAt(idx);
}

function convertToNaiForm(charToConvert) {
    return convertToVNai(charToConvert).concat("ない");
}

function convertToVTa(group, lastCharacter, result) {
    return convertToVTaOrVTe(group, lastCharacter, result, true);
}

function convertToVTe(group, lastCharacter, result) {
    return convertToVTaOrVTe(group, lastCharacter, result, false);
}

function convertToVTaOrVTe(group, lastCharacter, result, isVTa) {
    let tail1 = "て";
    let tail2 = "で";
    if (isVTa) {
        tail1 = "た";
        tail2 = "だ";
    }
    switch (group) {
        case 1:
            switch (lastCharacter) {
                case "う":
                case "つ":
                case "る":
                    return replaceLastCharacter(result, "っ").concat(tail1);
                case "む":
                case "ぶ":
                case "ぬ":
                    return replaceLastCharacter(result, "ん").concat(tail1);
                case "す":
                    return replaceLastCharacter(result, "し").concat(tail1);
                case "く":
                    return replaceLastCharacter(result, "い").concat(tail1);
                case "ぐ":
                    return replaceLastCharacter(result, "い").concat(tail2);
                default:
                    break;
            }
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            return replaceLastCharacter(result, "っ").concat(tail1);
        default:
            break;
    }
}
