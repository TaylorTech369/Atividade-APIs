const express = require('express')
const app = express()

// // O numero utilizado na barra de pesquisa após o localhost:
const port = 3000

const usuarios = []

// Configurar Json
app.use(express.json())

// Receber objeto Json
app.post('/usuarios', (req, res) => {
    if(!usuarios.some(u => u.email === req.body.email)){
    usuarios.push(req.body)
}

    res.send(usuarios)
})

app.listen(port, () => {
    console.log(`Funcionando`)
})



















// Cria um quarto quando se escreve localhost:3000
app.get('/', (req, res) => {
    res.send('Olá mundo grande')
})

// // Cria um outro quarto quando se adiciona /usuarios na pesquisa localhost:3000
// app.get('/usuarios', (req, res) => {
//     res.send({nome:"luciano"})
// })

// // Cria um outro quarto quando se adiciona /produtos na pesquisa localhost:3000
// app.get('/produtos', (req, res) => {
//     res.send('produtos')
// })

// app.listen(port, () => {
//     console.log(`Funcionando na porta ${port}`)
// })

// // Cria um outro quarto quando se adiciona /produtos na pesquisa localhost:3000
// app.get('/user', (req, res) => {
//     res.status(500).send("error")
// })

