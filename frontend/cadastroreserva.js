document.getElementById('cadastroReservaForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Coletando os dados do formulário de reserva
  const nome = document.getElementById('nome').value;
  const cpf = document.getElementById('cpf').value;
  const dataNascimento = document.getElementById('dataNascimento').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;
  const quarto = document.getElementById('quarto').value;
  const dataEntrada = document.getElementById('dataEntrada').value;
  const dataSaida = document.getElementById('dataSaida').value;

  // Validação simples
  if (!nome || !cpf || !dataNascimento || !email || !telefone || !quarto || !dataEntrada || !dataSaida) {
    alert('Por favor, preencha todos os campos.');
    return; // Interrompe a execução caso algum campo esteja vazio
  }

  // Validação de formato de CPF (XXX.XXX.XXX-XX)
  const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
  if (!cpfPattern.test(cpf)) {
    alert('CPF inválido! O formato deve ser XXX.XXX.XXX-XX.');
    return; // Interrompe a execução se o CPF for inválido
  }

  // Validação de datas
  const entrada = new Date(dataEntrada);
  const saida = new Date(dataSaida);
  if (entrada >= saida) {
    alert('A data de entrada não pode ser posterior ou igual à data de saída.');
    return; // Interrompe a execução se a data de entrada for inválida
  }

  // Criando a reserva
  const reserva = {
    nome, cpf, dataNascimento, email, telefone, quarto, dataEntrada, dataSaida
  };

  // Salvar a reserva no localStorage
  let reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  reservas.push(reserva);
  localStorage.setItem('reservas', JSON.stringify(reservas));

  // Redirecionar para a página de check-in
  window.location.href = 'checkin.html';
});

// Lógica do botão Voltar para Reservas
document.getElementById('voltarBtn').addEventListener('click', function() {
  window.location.href = 'reserva.html';  // Redireciona para a página de reservas
});
