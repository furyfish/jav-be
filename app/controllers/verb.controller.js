const db = require("../models");
const Verb = db.verb;
const Form = db.form;

const VerbDTO = require("../dtos/verb.dto");
const CommonConstants = require("../utils/constants/Common");
const NumberUtils = require("../utils/NumberUtils");
const StringUtils = require("../utils/StringUtils");
const ResultFactory = require("../factories/ResultFactory");
const AuthenticationService = require('../services/authentication.service');

const CLIENT_ID = '924086004375-57q8obkea57eo2k8a1j8mk3p138hj0jf.apps.googleusercontent.com';

// Retrieve a random Verb from the database.
exports.findRandom = async (req, res) => {

    /*let session = req.session;
    if (session.User == null) {
        return res.status(200).json({code: 0, status: 'error', session: 'No session'});
    }*/

    let token = req.query.token;
    if (token == null) {
        return res.status(200).json({code: 0, status: 'error', session: 'No session'});
    } else {
        const {OAuth2Client} = require('google-auth-library');
        const client = new OAuth2Client(CLIENT_ID);

        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,
            });
        }

        verify().catch(() => {
            return res.status(200).json({code: 0, status: 'error', session: 'No session'});
        });
    }

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

    // set furigana
    let result = await new ResultFactory(verb, form);
    let result1 = result.result1;
    let sFurigana = verb[0].furigana;
    sFurigana = sFurigana.replace(/\]\[/g, ',').replace(/\[/g, '').replace(/\]/g, '');
    let result2 = result1;
    let furigana = sFurigana.split(',');

    // set result2
    let idxFurigana = 0;
    for (let i = 0; i < result1.length; i++) {
        if (StringUtils.isKanji(result1.charAt(i))) {
            result2 = result2.replace(result1.charAt(i), furigana[idxFurigana]);
            idxFurigana += 1;
        }
    }

    const verbDTO = new VerbDTO(verb[0].id, verb[0].kanji, verb[0].furigana, verb[0].name_vn, verb[0].name_en, verb[0].group, '', form, result.tense, result.type, result1, result2);

    res.send(verbDTO);
};
