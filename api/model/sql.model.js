const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Sql = sequelize.define("sql", {
        title: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        published: {
            type: Sequelize.BOOLEAN
        }
    });

    return Sql;
};