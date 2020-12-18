module.exports = (sequelize, Sequelize) => {

    const Verb = sequelize.define("verb", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        kanji: {
            type: Sequelize.STRING
        },
        furigana: {
            type: Sequelize.STRING
        },
        name_vn: {
            type: Sequelize.STRING
        },
        name_en: {
            type: Sequelize.STRING
        },
        group: {
            type: Sequelize.INTEGER
        }
    });

    return Verb;
};
