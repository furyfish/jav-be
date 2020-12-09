const StringUtils = require("../utils/StringUtils");
const FormResult = require("../form_result/FormResult");
const MasuFormResult = require("../form_result/MasuFormResult");

module.exports = class NaiFormResult extends FormResult {
    constructor(verb) {
        super();
        this.result1 = NaiFormResult.convertVerbToVnai(verb).concat("ない");
        return this;
    }

    static convertVerbToVnai(verb) {
        let group = verb[0].group;
        let kanji = verb[0].kanji;
        switch (group) {
            case 1:
            case 4:
                return this.convertLastCharacterToVnai(kanji);
            case 2:
                return StringUtils.repmoveLastCharacter(kanji);
            case 3:
                return MasuFormResult.convertLastCharacterToVmasu(StringUtils.repmoveLastCharacter(kanji));
            default:
                break;
        }
    }

    static convertLastCharacterToVnai(kanji) {
        var input = "うくすつぬふむゆるぐずづぶぷ";
        var output = "わかさたなはまやらがざだばぱ";
        let lastCharacter = kanji.charAt(kanji.length - 1);
        let idx = input.indexOf(lastCharacter);
        if (idx < 0) {
            return kanji;
        }
        return StringUtils.replaceLastCharacter(kanji, output.charAt(idx));
    }
};
