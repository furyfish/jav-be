const StringUtils = require("../utils/StringUtils");
const CommonConstants = require("../utils/constants/Common");
const FormResult = require("../form_result/FormResult");

module.exports = class MasuFormResult extends FormResult {
    constructor(verb, tense, type) {
        super();
        if (tense.id == CommonConstants.TENSE.PRESENT) {    // hien tai/tuong lai
            if (type.id == CommonConstants.TYPE.POSITIVE) { // khang dinh
                this.result1 = MasuFormResult.convertVerbToVmasu(verb).concat("ます");
            } else {    // phu dinh
                this.result1 = MasuFormResult.convertVerbToVmasu(verb).concat("ません");
            }
        } else {    // qua khu
            if (type.id == CommonConstants.TENSE.PRESENT) { // khang dinh
                this.result1 = MasuFormResult.convertVerbToVmasu(verb).concat("ました");
            } else {    // phu dinh
                this.result1 = MasuFormResult.convertVerbToVmasu(verb).concat("ませんでした");
            }
        }
        this.tense = tense;
        this.type = type;
        return this;
    }

    static convertVerbToVmasu(verb) {
        let group = verb[0].group;
        let kanji = verb[0].kanji;
        switch (group) {
            case 1:
            case 4:
                return this.convertLastCharacterToVmasu(kanji);
            case 2:
                return StringUtils.repmoveLastCharacter(kanji);
            case 3:
                return this.convertLastCharacterToVmasu(StringUtils.repmoveLastCharacter(kanji));
            default:
                break;
        }
    }

    static convertLastCharacterToVmasu(kanji) {
        const input = "うくすつぬふむるぐずづぶぷ";
        const output = "いきしちにひみりぎじぢびぴ";
        let lastCharacter = kanji.charAt(kanji.length - 1);
        let idx = input.indexOf(lastCharacter);
        if (idx < 0) {
            return kanji;
        }
        return StringUtils.replaceLastCharacter(kanji, output.charAt(idx));
    }
};
