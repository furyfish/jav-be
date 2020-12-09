module.exports = class NumberUtils {

    static getRandomNumberInRange(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }
};
