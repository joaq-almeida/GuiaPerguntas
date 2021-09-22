const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");
const Pergunta = require("./database/Pergunta");
const Resposta = require("./database/Resposta");

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
    Pergunta.findAll({ raw: true, order: [["id", "DESC"]]})
        .then((perguntas) => {
            console.log(perguntas);
            res.render("index", { perguntas: perguntas })
        });
});

app.get("/perguntar", (req, res) => {
    res.render("perguntar");
});

app.post("/salvarpergunta", (req, res) => {
    let titulo = req.body.titulo;
    let descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/");
    }).catch((erro) => {
        res.send("Erro ao salvar item " + erro);
    });
});

app.get("/pergunta/:id", (req, res) => {
    let id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then((pergunta) => {
        if(pergunta != undefined)
            res.render("pergunta", {pergunta: pergunta});
        else
            res.redirect("/");
    });
});

app.post("/responder", (req, res) => {
    let corpo = req.body.corpo;
    let perguntaId = req.body.perguntaId;
    Resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    });
});

app.listen(3443, () => {
    console.log("App rodando em http://localhost:3443");
});