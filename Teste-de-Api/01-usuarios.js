// ---------------------------------- Express ----------------------------------

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

// ---------------------------------- Console ----------------------------------

app.listen(3001, () => {
  console.log('Servidor rodando em http://localhost:3001/usuarios');
});

// ------------------------------------------------------------------------------