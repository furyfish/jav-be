module.exports = (sequelize, Sequelize) => {

    const Form = sequelize.define("form", {
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
        },
        group: {
            type: Sequelize.INTEGER
        }
    });

    return Form;
};
