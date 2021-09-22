const Sequelize = require("sequelize");
const connection = require("./database");

const Resposta = connection.define("respostas", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Resposta.sync({force: false}).then(() => {
    console.log("tabela respostas criada com sucesso!")
}).catch((erro) => {
    console.log("tabela respostas não foi criada:  " + erro)
});

module.exports = Resposta;