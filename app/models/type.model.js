module.exports = (sequelize, Sequelize) => {

    const Type = sequelize.define("type", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name_vn: {
            type: Sequelize.STRING
        },
        name_en: {
            type: Sequelize.STRING
        },
        name_jp: {
            type: Sequelize.STRING
        }
    });

    return Type;
};
