const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const perguntaModel = require("./database/Pergunta");
//database
connection.authenticate().then(() => {
    console.log("conexão realizada com sucesso");
}).catch((erro) => {
    console.log("Erro ao conectar: " + erro)
});


//configurando template engine
app.set('view engine', 'ejs');
app.use(express.static("public"));
//config body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//routes
app.get("/", (req, res) => {
    res.render("index");
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    res.send("formulário recebido! \nTitulo: " + titulo + " Descricao: " + descricao);
});

app.listen(3443, () => {
    console.log("App rodando em http://localhost:3443");
});