document.getElementById('loginForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Dados de login (usuário e senha)
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Verificação simples de login (isso pode ser melhorado com autenticação real no futuro)
  if (username === 'admin' && password === 'admin') {
    // Se o login for bem-sucedido, redireciona para a página de reservas
    window.location.href = 'reserva.html'; // Substitua pelo caminho correto da página de reservas
  } else {
    // Se o login falhar, exibe um alerta
    alert('Usuário ou senha incorretos!');
  }
});
