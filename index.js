const express = require("express")
const app = express()

//configurando template engine
app.set('view engine', 'ejs')

app.get("/:nome/:lang", (req, res) => {
    let nome = req.params.nome
    let lang = req.params.lang
    let exibirMsg = false

    let produtos = [
        {nome: "Doritos", preco: 3.14},
        {nome: "Chá de pessego", preco: 5.99},
        {nome: "Coxinha", preco: 0.50}
    ]

    res.render("index", {
        nome: nome,
        lang: lang,
        empresa: "Company ltda",
        inscritos: 8000,
        msg: exibirMsg,
        produtos: produtos
    })
})

app.listen(3443, () => {
    console.log("App rodando em http://localhost:3443")
})