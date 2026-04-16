// ---------------------------------- Express ----------------------------------

const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------------------- Tarefas ----------------------------------

let tarefas = [];
let idAtual = 1;


// Criar nova tarefa (nome obrigatório, feito = false)
app.post('/tarefas', (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({ erro: 'Nome é obrigatório' });
  }

  const novaTarefa = {
    id: idAtual++,
    nome,
    feito: false,
  };

  tarefas.push(novaTarefa);

  res.status(201).json(novaTarefa);
});


// Listar tarefas
app.get('/tarefas', (req, res) => {
  res.json(tarefas);
});


// Editar tarefa (buscar por id e atualizar feito)
app.put('/tarefas/:id', (req, res) => {
  const { id } = req.params;
  const { feito } = req.body;

  if (feito !== true && feito !== false && feito !== 'true' && feito !== 'false') {
    return res.status(400).json({
      erro: 'feito deve ser boolean (true/false) ou string "true"/"false"',
    });
  }

  const tarefa = tarefas.find((t) => t.id == id);

  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  tarefa.feito = feito === true || feito === 'true';

  res.json(tarefa);
});

// ---------------------------------- Mensagem ----------------------------------

app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3001/tarefas');
});

// ------------------------------------------------------------------------------