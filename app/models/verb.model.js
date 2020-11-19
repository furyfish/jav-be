module.exports = (sequelize, Sequelize) => {

    const Verb = sequelize.define("verb", {
        plain: {
            type: Sequelize.STRING
        },
        polite: {
            type: Sequelize.STRING
        },
        furigana: {
            type: Sequelize.STRING
        },
        vietnamese: {
            type: Sequelize.STRING
        },
        english: {
            type: Sequelize.STRING
        }
    });

    return Verb;
};