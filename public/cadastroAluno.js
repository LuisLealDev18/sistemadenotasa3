// Função para validar CPF
function validarCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false; // CPF com todos os dígitos iguais (exemplo: 11111111111)
  }

  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cpf.charAt(9))) {
    return false;
  }

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== parseInt(cpf.charAt(10))) {
    return false;
  }

  return true;
}

// Função para validar telefone (11 dígitos)
function validarTelefone(telefone) {
  return telefone.length === 11 && /^[0-9]{2}[0-9]{9}$/.test(telefone);
}

// Função para mostrar o Toast de sucesso
function showToast() {
  const toast = document.getElementById("toast");
  toast.className = "toast show"; // Adiciona a classe 'show' para exibir a notificação
  setTimeout(() => {
    toast.className = toast.className.replace("show", ""); // Remove a classe 'show' após 3 segundos
  }, 3000);
}

document.getElementById('registerForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const cpf = document.getElementById('cpf').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;
  const endereco = document.getElementById('endereco').value;
  const curso = document.getElementById('curso').value;
  const usuario = document.getElementById('usuario').value;
  const senha = document.getElementById('senha').value;
  const confirmarSenha = document.getElementById('confirmarSenha').value;

  // Valida CPF
  if (!validarCPF(cpf)) {
    document.getElementById('registroErro').textContent = 'CPF inválido.';
    return;
  }

  // Valida telefone (11 dígitos)
  if (!validarTelefone(telefone)) {
    document.getElementById('registroErro').textContent = 'Telefone inválido. Deve ter 11 dígitos.';
    return;
  }

  // Verifica se as senhas coincidem
  if (senha !== confirmarSenha) {
    document.getElementById('registroErro').textContent = 'As senhas não coincidem.';
    return;
  }

  const alunoData = { nome, cpf, email, telefone, endereco, curso, usuario, senha };

  let alunos = JSON.parse(localStorage.getItem('alunos')) || [];

  const alunoExistente = alunos.find(a => a.cpf === cpf || a.usuario === usuario);
  if (alunoExistente) {
    document.getElementById('registroErro').textContent = 'Já existe um aluno com esse CPF ou nome de usuário.';
    return;
  }

  alunos.push(alunoData);
  localStorage.setItem('alunos', JSON.stringify(alunos));

  showToast(); // Exibe a notificação de sucesso
  window.location.href = 'loginAluno.html';  
});
