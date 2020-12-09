module.exports = class StringUtils {

    static replaceLastCharacter(string, replaceWith) {
        return string.replace(/.$/, replaceWith);
    }

    static repmoveLastCharacter(string) {
        return this.replaceLastCharacter(string, "");
    }
};
