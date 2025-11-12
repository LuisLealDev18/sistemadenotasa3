// Armazenamento temporário de reservas
let reservas = [];
let checkins = [];
let checkoutHoje = [];

// Função para cadastrar o check-in
document.getElementById('checkinForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Coletando os dados do formulário de check-in
  const nome = document.getElementById('nome').value;
  const cpf = document.getElementById('cpf').value;
  const dataNascimento = document.getElementById('dataNascimento').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;
  const quarto = document.getElementById('quarto').value;

  // Criando uma nova reserva
  const reserva = {
    nome, cpf, dataNascimento, email, telefone, quarto, 
    dataEntrada: new Date().toLocaleDateString()  // Data de entrada é a data atual
  };

  // Adicionando a reserva no armazenamento
  reservas.push(reserva);
  checkins.push(reserva);  // Registrando o check-in

  // Exibindo a reserva no painel de entradas de hoje
  exibirEntradasSaidas();

  // Limpar formulário
  document.getElementById('checkinForm').reset();
});

// Função para exibir as entradas e saídas de hoje
function exibirEntradasSaidas() {
  const entradasSaidasDiv = document.getElementById('entradasSaidas');
  entradasSaidasDiv.innerHTML = '';  // Limpa antes de adicionar

  const hoje = new Date().toLocaleDateString();

  // Filtra as reservas feitas para o dia de hoje
  const entradasHoje = checkins.filter(reserva => reserva.dataEntrada === hoje);
  checkoutHoje.length = 0;  // Limpar as saídas do dia

  entradasSaidasDiv.innerHTML = `<strong>Entradas de Hoje:</strong><br>`;

  entradasHoje.forEach(reserva => {
    entradasSaidasDiv.innerHTML += `
      Nome: ${reserva.nome} - Quarto: ${reserva.quarto}<br>
      <button onclick="realizarCheckout('${reserva.nome}')">Check-out</button><br>
    `;
  });

  // Mostrar saída dos checkouts realizados
  entradasSaidasDiv.innerHTML += `<br><strong>Check-out Realizado:</strong><br>`;
  checkoutHoje.forEach(reserva => {
    entradasSaidasDiv.innerHTML += `
      Nome: ${reserva.nome} - Quarto: ${reserva.quarto}<br>
    `;
  });
}

// Função para realizar check-out
function realizarCheckout(nome) {
  const reservaCheckout = checkins.find(reserva => reserva.nome === nome);
  if (reservaCheckout) {
    checkoutHoje.push(reservaCheckout);
    checkins = checkins.filter(reserva => reserva.nome !== nome);  // Remove o check-in
    exibirEntradasSaidas();  // Atualiza a lista de entradas e saídas
  }
}

// Inicializar o calendário
$('#calendar').fullCalendar({
  events: function(start, end, timezone, callback) {
    const events = reservas.map(reserva => {
      return {
        title: `${reserva.nome} - Quarto ${reserva.quarto}`,
        start: moment(reserva.dataEntrada, 'MM/DD/YYYY').format(),
        allDay: true
      };
    });
    callback(events);
  },
});

// Redirecionar para a página de login ao clicar no botão "Sair"
document.getElementById('logoutBtn').addEventListener('click', function() {
  window.location.href = 'login.html';  // Substitua pelo caminho correto da página de login
});
