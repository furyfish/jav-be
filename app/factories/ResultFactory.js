const db = require("../models");
const Tense = db.tense;
const Type = db.type;

const NumberUtils = require("../utils/NumberUtils");
const MasuFormResult = require("../form-result/MasuFormResult");
const NaiFormResult = require("../form-result/NaiFormResult");
const TaFormResult = require("../form-result/TaFormResult");
const TeFormResult = require("../form-result/TeFormResult");
const PotentialFormResult = require("../form-result/PotentialFormResult");
const PassiveFormResult = require("../form-result/PassiveFormResult");
const ConditionalFormResult = require("../form-result/ConditionalFormResult");

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
            case 3: // the qua khu
                return new TaFormResult(verb, type);
            case 4: // the te
                return new TeFormResult(verb);
            case 5: // the kha nang
                return new PotentialFormResult(verb);
            case 6: // the bi dong
                return new PassiveFormResult(verb);
            case 8: // the dieu kien
                return new ConditionalFormResult(verb);
            default:
                break;
        }
    }
};
