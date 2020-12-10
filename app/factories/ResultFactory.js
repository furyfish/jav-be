const db = require("../models");
const Tense = db.tense;
const Type = db.type;

const NumberUtils = require("../utils/NumberUtils");
const MasuFormResult = require("../form_result/MasuFormResult");
const NaiFormResult = require("../form_result/NaiFormResult");
const TaFormResult = require("../form_result/TaFormResult");
const TeFormResult = require("../form_result/TeFormResult");
const PotentialFormResult = require("../form_result/PotentialFormResult");
const PassiveFormResult = require("../form_result/PassiveFormResult");

module.exports = class ResultFactory {
    constructor(verb, form) {
        return this.getResult(verb, form);
    }

    async getResult(verb, form) {

        let tenses = new Map();
        let types = new Map();

        let data = await Tense.findAll();
        data.forEach(tense => {
            tenses.set(tense.id, tense);
        });

        data = await Type.findAll();
        data.forEach(type => {
            types.set(type.id, type);
        });

        let tense = tenses.get(NumberUtils.getRandomNumberInRange(1, tenses.size));
        let type = types.get(NumberUtils.getRandomNumberInRange(1, types.size));

        switch (form.id) {
            case 1: // the lich su
                return new MasuFormResult(verb, tense, type);
            case 2: // the phu dinh
                return new NaiFormResult(verb);
            case 3: // the ta
                return new TaFormResult(verb, type);
            case 4: // the te
                return new TeFormResult(verb);
            case 5: // the kha nang
                return new PotentialFormResult(verb);
            case 6: // the bi dong
                return new PassiveFormResult(verb);
            default:
                break;
        }
    }
};
