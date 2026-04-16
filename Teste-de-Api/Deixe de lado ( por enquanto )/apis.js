const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------------------------- Usuario ----------------------------------

const Criptografar = require('bcrypt');

let usuarios = [];

app.post('/usuarios', async (req, res) => {
  try {
    const { nome, email, senha } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: "Dados obrigatórios"});
    }

    const usuarioExiste = usuarios.find(u => u.email === email);

    if (usuarioExiste) {
      return res.status(400).json({ erro: "Email já cadastrado" });
    }

    const senhaHash = await Criptografar.hash(senha, 10);

    usuarios.push({ nome, email, senha: senhaHash });

    res.status(201).json({ nome, email });
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao criar usuários"});
  }
});

app.get('/usuarios', (req, res) => {
  const usuariosSemSenha = usuarios.map(({ senha, ...resto}) => resto);
  res.json(usuariosSemSenha);
});

app.delete('/usuarios/:email', (req, res) => {
  const { email } = req.params;

  const existe = usuarios.some(u => u.email === email);

  if (!existe) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }

  usuarios = usuarios.filter(u => u.email !== email);

  res.json({ mensagem: "Usuário removido" });
});

// ---------------------------------- Receitas ----------------------------------

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

// ---------------------------------- Alunos ----------------------------------

let alunos = [];

app.post('/alunos', (req, res) => {
  const { nome, dataNascimento } = req.body;

  // Validação
  if (!nome || !dataNascimento) {
    return res.status(400).json({
      erro: "Nome e data de nascimento são obrigatórios"
    });
  }

  // Converter data
  const dataNasc = new Date(dataNascimento);
  const hoje = new Date();

  if (isNaN(dataNasc)) {
    return res.status(400).json({
      erro: "Data de nascimento inválida"
    });
  }

  // Calcular idade
  let idade = hoje.getFullYear() - dataNasc.getFullYear();
  const mes = hoje.getMonth() - dataNasc.getMonth();

  if (mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())) {
    idade--;
  }

  // Definir maioridade
  const maioridade = idade >= 18 ? "maior de idade" : "menor de idade";

  const aluno = {
    nome,
    dataNascimento,
    idade,
    maioridade
  };

  alunos.push(aluno);

  res.status(201).json(aluno);
});

app.get('/alunos', (req, res) => {
  res.json(alunos);
});

// ---------------------------------- Mensagem ----------------------------------

app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3001');
});

// ------------------------------------------------------------------------------