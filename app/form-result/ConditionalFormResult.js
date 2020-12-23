const StringUtils = require("../utils/StringUtils");
const FormResult = require(".//FormResult");

module.exports = class ConditionalFormResult extends FormResult {
    constructor(verb) {
        super();
        this.result1 = ConditionalFormResult.convertVerbToVconditional(verb);
        return this;
    }

    static convertVerbToVconditional(verb) {
        let group = verb[0].group;
        let kanji = verb[0].kanji;
        switch (group) {
            case 1:
            case 4:
                return this.convertLastCharacterToVconditional(kanji).concat("ば");
            case 2:
            case 3:
                return StringUtils.repmoveLastCharacter(kanji).concat("れば");
            default:
                break;
        }
    }

    static convertLastCharacterToVconditional(kanji) {
        let input = "うくすつぬふむるぐずづぶぷ";
        let output = "えけせてねへめれげぜでべぺ";
        let lastCharacter = kanji.charAt(kanji.length - 1);
        let idx = input.indexOf(lastCharacter);
        if (idx < 0) {
            return kanji;
        }
        return StringUtils.replaceLastCharacter(kanji, output.charAt(idx));
    }
};
