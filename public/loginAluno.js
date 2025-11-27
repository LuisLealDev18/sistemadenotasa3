document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Previne o envio tradicional do formulário

  const usuario = document.getElementById('usuario').value;  // Coleta o nome de usuário
  const senha = document.getElementById('senha').value;  // Coleta a senha

  // Recupera os alunos armazenados no localStorage
  let alunos = JSON.parse(localStorage.getItem('alunos')) || [];

  // Verifica se existe um aluno com as credenciais fornecidas
  const aluno = alunos.find(a => a.usuario === usuario && a.senha === senha);

  if (aluno) {
    // Salva os dados do aluno logado no localStorage
    localStorage.setItem('alunoLogado', JSON.stringify(aluno));  // Salva o aluno logado
    window.location.href = 'areaAluno.html';  // Redireciona para a área do aluno
  } else {
    // Exibe uma mensagem de erro caso as credenciais estejam incorretas
    document.getElementById('loginErro').textContent = 'Usuário ou senha incorretos';
  }
});
