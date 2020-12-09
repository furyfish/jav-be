const StringUtils = require("../utils/StringUtils");
const CommonConstants = require("../utils/constants/Common");
const FormResult = require("../form_result/FormResult");
const MasuFormResult = require("../form_result/MasuFormResult");
const NaiFormResult = require("../form_result/NaiFormResult");

module.exports = class TaFormResult extends FormResult {
    constructor(verb, type) {
        super();
        if (type.id == CommonConstants.TYPE.POSITIVE) { // khang dinh
            this.result1 = TaFormResult.convertVerbToVta(verb);
        } else {    // phu dinh
            this.result1 = NaiFormResult.convertLastCharacterToVnai(verb[0].kanji).concat("なかった");
        }
        this.type = type;
        return this;this.result1
    }

    static convertVerbToVta(verb) {
        let group = verb[0].group;
        let kanji = verb[0].kanji;
        let lastCharacter = kanji.charAt(kanji.length - 1);
        let taTail = "た";
        let daTail = "だ";
        switch (group) {
            case 1:
                switch (lastCharacter) {
                    case "う":
                    case "つ":
                    case "る":
                        return StringUtils.replaceLastCharacter(kanji, "っ").concat(taTail);
                    case "む":
                    case "ぶ":
                    case "ぬ":
                        return StringUtils.replaceLastCharacter(kanji, "ん").concat(taTail);
                    case "す":
                        return StringUtils.replaceLastCharacter(kanji, "し").concat(taTail);
                    case "く":
                        return StringUtils.replaceLastCharacter(kanji, "い").concat(taTail);
                    case "ぐ":
                        return StringUtils.replaceLastCharacter(kanji, "い").concat(daTail);
                    default:
                        break;
                }
            case 2:
                return StringUtils.replaceLastCharacter(kanji, taTail);
            case 3:
                ;
                return MasuFormResult.convertLastCharacterToVmasu(StringUtils.replaceLastCharacter(kanji, "")).concat(taTail);
            case 4:
                return StringUtils.replaceLastCharacter(kanji, "っ").concat(taTail);
            default:
                break;
        }
    }
};
