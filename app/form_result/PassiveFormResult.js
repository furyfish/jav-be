const StringUtils = require("../utils/StringUtils");
const FormResult = require("../form_result/FormResult");

module.exports = class PassiveFormResult extends FormResult {
    constructor(verb) {
        super();
        this.result1 = PassiveFormResult.convertVerbToVpassive(verb);
        return this;
    }

    static convertVerbToVpassive(verb) {
        let group = verb[0].group;
        let kanji = verb[0].kanji;
        switch (group) {
            case 1:
            case 4:
                return this.convertLastCharacterToVpassive(kanji).concat("れる");
            case 2:
                return StringUtils.repmoveLastCharacter(kanji).concat("られる");
            case 3:
                if (verb[0].furigana.contains("す")) {
                    return "される";
                } else if (verb[0].furigana.contains("く")) {
                    return "こられる";
                }
            default:
                break;
        }
    }

    static convertLastCharacterToVpassive(kanji) {
        let input = "うくすつぬふむゆるぐずづぶぷ";
        let output = "わかさたなはまやらがざだばぱ";
        let lastCharacter = kanji.charAt(kanji.length - 1);
        let idx = input.indexOf(lastCharacter);
        if (idx < 0) {
            return kanji;
        }
        return StringUtils.replaceLastCharacter(kanji, output.charAt(idx));
    }
};
