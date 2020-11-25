module.exports = (sequelize, Sequelize) => {

    const Verb = sequelize.define("verb", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        jisho: {
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
