window.onload = function() {
  const historico = JSON.parse(localStorage.getItem('historico')) || [];
  const historicoReservas = document.getElementById('historicoReservas');

  // Limpar o conteúdo do histórico
  historicoReservas.innerHTML = '';

  // Exibir as reservas no histórico
  historico.forEach(reserva => {
    historicoReservas.innerHTML += `
      <div>
        <strong>${reserva.nome}</strong> - Quarto: ${reserva.quarto} - Data de Saída: ${reserva.dataSaida}
      </div>
    `;
  });
};

// Logout
document.getElementById('voltarBtn').addEventListener('click', function() {
  window.location.href = 'reserva.html';  // Redireciona para o login
});

