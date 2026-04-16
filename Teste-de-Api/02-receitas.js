// ---------------------------------- Express ----------------------------------

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------------------- Usuario ----------------------------------

let receitas = [];

app.post('/receitas', (req, res) => {
  try {
    const { nome, ingredientes, modo } = req.body;

    if (!nome || !ingredientes || !modo) {
      return res.status(400).json({ erro: "Dados obrigatórios" });
    }

    receitas.push({ nome, ingredientes, modo });
    res.status(201).json(receitas);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao criar receita" });
  }
});

app.get('/receitas', (req, res) => {
  res.json(receitas);
});

// ---------------------------------- Console ----------------------------------

app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3001/receitas');
});

// ------------------------------------------------------------------------------