const StringUtils = require("../utils/StringUtils");
const FormResult = require("../form_result/FormResult");
const MasuFormResult = require("../form_result/MasuFormResult");

module.exports = class TeFormResult extends FormResult {
    constructor(verb) {
        super();
        this.result1 = TeFormResult.convertVerbToVte(verb);
        return this;
    }

    static convertVerbToVte(verb) {
        let group = verb[0].group;
        let kanji = verb[0].kanji;
        let lastCharacter = kanji.charAt(kanji.length - 1);
        let teTail = "て";
        let deTail = "で";
        switch (group) {
            case 1:
                switch (lastCharacter) {
                    case "う":
                    case "つ":
                    case "る":
                        return StringUtils.replaceLastCharacter(kanji, "っ").concat(teTail);
                    case "む":
                    case "ぶ":
                    case "ぬ":
                        return StringUtils.replaceLastCharacter(kanji, "ん").concat(teTail);
                    case "す":
                        return StringUtils.replaceLastCharacter(kanji, "し").concat(teTail);
                    case "く":
                        return StringUtils.replaceLastCharacter(kanji, "い").concat(teTail);
                    case "ぐ":
                        return StringUtils.replaceLastCharacter(kanji, "い").concat(deTail);
                    default:
                        break;
                }
            case 2:
                return StringUtils.replaceLastCharacter(kanji, teTail);
            case 3:
                return MasuFormResult.convertLastCharacterToVmasu(StringUtils.replaceLastCharacter(kanji, "")).concat(teTail);
            case 4:
                return StringUtils.replaceLastCharacter(kanji, "っ").concat(teTail);
            default:
                break;
        }
    }
};
