window.onload = function() {
  const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  const checkinOptions = document.getElementById('checkinOptions');

  // Limpar as opções de check-in
  checkinOptions.innerHTML = '';

  // Exibir as reservas em ordem de data de entrada
  reservas.sort((a, b) => new Date(a.dataEntrada) - new Date(b.dataEntrada));

  reservas.forEach((reserva, index) => {
    if (!reserva.checkin) { // Só exibe reservas para check-in
      checkinOptions.innerHTML += `
        <div>
          <strong>${reserva.nome}</strong> - Quarto: ${reserva.quarto}
          <button onclick="confirmarCheckin(${index})">Confirmar Check-in</button>
        </div>
      `;
    }
  });
};

// Função de confirmar check-in
function confirmarCheckin(index) {
  const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  const reserva = reservas[index];

  // Marcar a reserva como check-in e movê-la para o histórico
  reserva.checkin = true;

  // Atualizando as reservas no localStorage
  localStorage.setItem('reservas', JSON.stringify(reservas));

  // Mover a reserva para o checkout
  const checkout = JSON.parse(localStorage.getItem('checkout')) || [];
  checkout.push(reserva);  // Adiciona a reserva ao checkout
  localStorage.setItem('checkout', JSON.stringify(checkout));  // Atualiza o checkout

  // Atualizar as opções de check-in e check-out
  carregarReservas();  // Atualiza a página

  window.location.href = 'reserva.html';  // Redireciona para a página de reservas
}

// Função para carregar as reservas e exibir no calendário
function carregarReservas() {
  const reservas = JSON.parse(localStorage.getItem('reservas')) || [];
  const checkinOptions = document.getElementById('checkinOptions');
  const checkoutOptions = document.getElementById('checkoutOptions');

  checkinOptions.innerHTML = ''; // Limpar as opções de check-in
  checkoutOptions.innerHTML = ''; // Limpar as opções de check-out

  // Exibir as reservas para Check-in
  reservas.sort((a, b) => new Date(a.dataEntrada) - new Date(b.dataEntrada));

  reservas.forEach((reserva, index) => {
    if (!reserva.checkin) { // Só exibe reservas para check-in
      checkinOptions.innerHTML += `
        <div>
          <strong>${reserva.nome}</strong> - Quarto: ${reserva.quarto}
          <button onclick="confirmarCheckin(${index})">Confirmar Check-in</button>
        </div>
      `;
    }
  });

  // Exibir as reservas para Check-out
  const checkout = JSON.parse(localStorage.getItem('checkout')) || [];
  checkout.forEach((reserva) => {
    checkoutOptions.innerHTML += `
      <div>
        <strong>${reserva.nome}</strong> - Quarto: ${reserva.quarto} - Data de Saída: ${reserva.dataSaida}
      </div>
    `;
  });
}

// Função de Voltar para a página de Reservas
document.getElementById('voltarBtn').addEventListener('click', function() {
  window.location.href = 'reserva.html';  // Redireciona para a página de reservas
});
