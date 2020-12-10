const db = require("../models");
const Verb = db.verb;
const Form = db.form;

const VerbDTO = require("../dtos/verb.dto");
const CommonConstants = require("../utils/constants/Common");
const NumberUtils = require("../utils/NumberUtils");
const ResultFactory = require("../factories/ResultFactory");

// Retrieve a random Verb from the database.
exports.findRandom = async (req, res) => {

    let forms = new Map();
    let data = await Form.findAll();
    data.forEach(form => {
        forms.set(form.id, form);
    });

    // get form from request
    let masuForm = req.query.masuForm == CommonConstants.ENABLED_FORM;
    let naiForm = req.query.naiForm == CommonConstants.ENABLED_FORM;
    let taForm = req.query.taForm == CommonConstants.ENABLED_FORM;
    let teForm = req.query.teForm == CommonConstants.ENABLED_FORM;
    let potentialForm = req.query.potentialForm == CommonConstants.ENABLED_FORM;
    let passiveForm = req.query.passiveForm == CommonConstants.ENABLED_FORM;
    let conditionalForm = req.query.conditionalForm == CommonConstants.ENABLED_FORM;
    let activeForms = [];
    if (masuForm) {
        activeForms.push(forms.get(1).id);
    }
    if (naiForm) {
        activeForms.push(forms.get(2).id);
    }
    if (taForm) {
        activeForms.push(forms.get(3).id);
    }
    if (teForm) {
        activeForms.push(forms.get(4).id);
    }
    if (potentialForm) {
        activeForms.push(forms.get(5).id);
    }
    if (passiveForm) {
        activeForms.push(forms.get(6).id);
    }
    if (conditionalForm) {
        activeForms.push(forms.get(8).id);
    }
    if (activeForms.length == 0) {
        activeForms.push(forms.get(1).id);
    }
    // get random verb from db
    let verb = await Verb.findAll({order: db.Sequelize.literal('rand()'), limit: 1});

    // set form + tense + type
    let index = NumberUtils.getRandomNumberInRange(0, activeForms.length - 1);
    let form = forms.get(activeForms[index]);

    // set result
    let result = await new ResultFactory(verb, form);
    let result1 = result.result1;
    let result2 = result1.replace(/^./, verb[0].furigana).replace(/\[/g, '').replace(/\]/g, '');
    const verbDTO = new VerbDTO(verb[0].id, verb[0].kanji, verb[0].furigana, verb[0].vietnamese, verb[0].english, verb[0].group, '', form, result.tense, result.type, result1, result2);

    res.send(verbDTO);
};
