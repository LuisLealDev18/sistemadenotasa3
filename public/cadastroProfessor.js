// Quando o formulário for enviado
document.getElementById('cadastroForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página)

  // Coleta os dados do professor
  const nome = document.getElementById('nome').value;
  const codigo = document.getElementById('codigo').value;
  const materia = document.getElementById('materia').value;
  const senha = document.getElementById('senha').value;

  // Envia os dados para o backend via POST
  fetch('http://localhost:3000/api/loginProfessor', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, codigo, materia, senha }) // Envia os dados no corpo da requisição
  })
  .then(response => response.json()) // Responde com um JSON
  .then(data => {
    if (data.success) {
      alert('Professor cadastrado com sucesso!');
      window.location.href = 'loginProfessor.html'; // Redireciona para o login do professor
    } else {
      document.getElementById('cadastroErro').textContent = data.message; // Exibe erro, caso haja
    }
  })
  .catch(error => {
    console.error('Erro ao realizar cadastro:', error);
    document.getElementById('cadastroErro').textContent = 'Erro no servidor';
  });
});
