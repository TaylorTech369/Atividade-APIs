// ---------------------------------- Express ----------------------------------

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------------------- Produtos ----------------------------------

let produtos = [];


app.post('/produtos', (req, res) => {
  const { nome, preco, validade } = req.body;
  produtos.push({ nome, preco, validade });
  res.json(produtos);
});


app.get('/produtos', (req, res) => {
  res.json(produtos);
});


// ---------------------------------- Mensagem ----------------------------------

app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3001/produtos');
});

// ------------------------------------------------------------------------------