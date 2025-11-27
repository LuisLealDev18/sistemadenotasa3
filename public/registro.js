document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Previne o envio tradicional do formulário

  // Coletando dados do formulário
  const nome = document.getElementById('nome').value;
  const cpf = document.getElementById('cpf').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;
  const endereco = document.getElementById('endereco').value;
  const curso = document.getElementById('curso').value;
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;

  // Verifica se as senhas são iguais
  if (senha !== confirmarSenha) {
    document.getElementById('registroErro').textContent = 'As senhas não coincidem.';
    return;
  }

  // Criar objeto com os dados do aluno
  const alunoData = {
    nome,
    cpf,
    email,<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <title>Área do Professor</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <div class="dashboard-container">
    <h1>Área do Professor</h1>
    <h2>Cadastrar Notas</h2>
    
    <div id="alunosLista">
      <!-- Aqui serão exibidos os alunos da matéria do professor -->
    </div>

    <button id="logoutBtn">Sair</button>
  </div>

  <script>
    // Recupera os dados do professor logado
    const professorLogado = JSON.parse(localStorage.getItem('professorLogado'));

    if (!professorLogado) {
      window.location.href = 'loginProfessor.html'; // Redireciona para login se o professor não estiver logado
    }

    // Recupera os alunos cadastrados no localStorage
    const alunos = JSON.parse(localStorage.getItem('alunos')) || [];

    // Filtra alunos pela matéria do professor logado
    const alunosMateria = alunos.filter(a => a.materia === professorLogado.materia);

    // Exibe os alunos para o professor
    const alunosListaDiv = document.getElementById('alunosLista');
    alunosMateria.forEach(aluno => {
      const alunoDiv = document.createElement('div');
      alunoDiv.innerHTML = `
        <h3>${aluno.nome}</h3>
        <label>A1: <input type="number" value="${aluno.notas.A1}" data-aluno-id="${aluno.id}" data-nota="A1"></label>
        <label>A2: <input type="number" value="${aluno.notas.A2}" data-aluno-id="${aluno.id}" data-nota="A2"></label>
        <label>A3: <input type="number" value="${aluno.notas.A3}" data-aluno-id="${aluno.id}" data-nota="A3"></label>
      `;
      alunosListaDiv.appendChild(alunoDiv);
    });

    // Salva as notas alteradas no localStorage
    document.getElementById('alunosLista').addEventListener('input', (e) => {
      if (e.target.tagName === 'INPUT') {
        const alunoId = e.target.getAttribute('data-aluno-id');
        const nota = e.target.getAttribute('data-nota');
        const valor = e.target.value;

        // Atualiza as notas do aluno
        const aluno = alunos.find(a => a.id == alunoId);
        if (aluno) {
          aluno.notas[nota] = valor;
          localStorage.setItem('alunos', JSON.stringify(alunos));
        }
      }
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', () => {
      localStorage.removeItem('professorLogado');
      window.location.href = 'loginProfessor.html';
    });
  </script>
</body>
</html>
incd
    telefone,
    endereco,
    curso,
    usuario,
    senha
  };

  // Recupera a lista de alunos do localStorage (se houver)
  let alunos = JSON.parse(localStorage.getItem('alunos')) || [];

  // Verifica se já existe um aluno com o mesmo CPF ou nome de usuário
  const alunoExistente = alunos.find(aluno => aluno.cpf === cpf || aluno.usuario === usuario);
  if (alunoExistente) {
    document.getElementById('registroErro').textContent = 'Já existe um aluno com esse CPF ou nome de usuário.';
    return;
  }

  // Adiciona o novo aluno ao localStorage
  alunos.push(alunoData);
  localStorage.setItem('alunos', JSON.stringify(alunos));

  alert('Aluno cadastrado com sucesso!');
  window.location.href = 'loginAluno.html';  // Redireciona para a página de login
});
a