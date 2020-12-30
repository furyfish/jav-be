module.exports = class StringUtils {

    static replaceLastCharacter(string, replaceWith) {
        return string.replace(/.$/, replaceWith);
    }

    static repmoveLastCharacter(string) {
        return this.replaceLastCharacter(string, "");
    }

    static isKanji(string) {
        const REGEX_KANJI = /[\u4e00-\u9faf\u3400-\u4dbf]/;
        return string.match(REGEX_KANJI);
    }

    static replaceAt(string, index, replacement) {
        if (index > string.length - 1) return string;
        return string.substring(0, index) + replacement + string.substring(index + 1);
    }
};
