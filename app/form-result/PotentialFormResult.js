const StringUtils = require("../utils/StringUtils");
const FormResult = require(".//FormResult");

module.exports = class PotentialFormResult extends FormResult {
    constructor(verb) {
        super();
        this.result1 = PotentialFormResult.convertVerbToVpotential(verb);
        return this;
    }

    static convertVerbToVpotential(verb) {
        let group = verb[0].group;
        let kanji = verb[0].kanji;
        let str = "aaaa";
        str.con
        switch (group) {
            case 1:
            case 4:
                return this.convertLastCharacterToVpotential(kanji).concat("る");
            case 2:
                return StringUtils.repmoveLastCharacter(kanji).concat("られる");
            case 3:
                if (verb[0].kanji === "為る" || verb[0].kanji === "する") {
                    return "できる";
                } else if (verb[0].kanji === "来る") {
                    return "こられる";
                } else {
                    return verb[0].kanji.replace("する", "").concat("できる");
                }
            default:
                break;
        }
    }

    static convertLastCharacterToVpotential(kanji) {
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
