const Sequelize = require("sequelize");
const connection = new Sequelize("guiaperguntas", "admin", "password",{
    host: "localhost",
    dialect: "mysql"
});

module.exports = connection;