const StringUtils = require("../utils/StringUtils");
const FormResult = require(".//FormResult");

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
                if (verb[0].kanji === "為る" || verb[0].kanji === "する") {
                    return "される";
                } else if (verb[0].kanji === "来る") {
                    return "こられる";
                } else {
                    return verb[0].kanji.replace("する", "").concat("される");
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
