const express = require("express")
const app = express()

//configurando template engine
app.set('view engine', 'ejs')

app.get("/:nome/:lang", (req, res) => {
    let nome = req.params.nome
    let lang = req.params.lang
    res.render("index", {
        nome: nome,
        lang: lang,
        empresa: "Company ltda",
        inscritos: 8000
    })
})

app.listen(3443, () => {
    console.log("App rodando em http://localhost:3443")
})