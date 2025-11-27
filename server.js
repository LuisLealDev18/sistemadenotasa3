const express = require('express');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
const path = require('path');

// Criando a instância do Prisma Client
const prisma = new PrismaClient();

// Inicializando o app Express
const app = express();
app.use(bodyParser.json()); // Para processar JSON no corpo da requisição

// Configuração do Express para servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));  // Serve arquivos da pasta 'public'

// Rota de login do aluno
app.post('/api/loginAluno', async (req, res) => {
  const { usuario, senha } = req.body;
  
  // Buscando o aluno no banco de dados
  const aluno = await prisma.student.findUnique({
    where: { username: usuario }
  });

  if (aluno && aluno.password_hash === senha) {
    res.json({ success: true, aluno });
  } else {
    res.json({ success: false, message: 'Usuário ou senha incorretos' });
  }
});

// Rota de login do professor
app.post('/api/loginProfessor', async (req, res) => {
  const { codigo } = req.body;
  
  // Buscando o professor no banco de dados
  const professor = await prisma.employee.findUnique({
    where: { code: codigo }
  });

  if (professor) {
    res.json({ success: true, professor });
  } else {
    res.json({ success: false, message: 'Código de acesso inválido' });
  }
});

// Rota para buscar os dados de um aluno pelo usuário
app.get('/api/aluno/:usuario', async (req, res) => {
  const { usuario } = req.params;

  // Buscando o aluno no banco de dados
  const aluno = await prisma.student.findUnique({
    where: { username: usuario },
    include: { StudentSchoolSubjects: { include: { school_subject: true } } }
  });

  if (aluno) {
    res.json(aluno);
  } else {
    res.status(404).json({ message: 'Aluno não encontrado' });
  }
});

// Rota para listar os alunos de uma matéria específica
app.get('/api/alunos/:materia', async (req, res) => {
  const { materia } = req.params;

  // Buscando alunos da matéria especificada
  const alunos = await prisma.student.findMany({
    where: { course: materia },
    include: { StudentSchoolSubjects: true }
  });

  res.json({ alunos });
});

// Rota para atualizar a nota de um aluno
app.put('/api/aluno/:id', async (req, res) => {
  const { id } = req.params;
  const { A1, A2, A3 } = req.body;

  // Atualizando as notas do aluno
  const aluno = await prisma.student.update({
    where: { id: id },
    data: {
      notas: {
        A1,
        A2,
        A3
      }
    }
  });

  // Calculando a média
  const media = ((A1 || 0) + (A2 || 0) + (A3 || 0)) / 3;
  res.json({ aluno, media });
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
