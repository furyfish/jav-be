module.exports = (sequelize, Sequelize) => {

    const Verb = sequelize.define("verb", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
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
        },
        group: {
            type: Sequelize.INTEGER
        }
    });

    return Verb;
};
