window.onload = function() {
  const checkoutOptions = document.getElementById('checkoutOptions');

  // Limpar as opções de check-out
  checkoutOptions.innerHTML = '';

  const checkout = JSON.parse(localStorage.getItem('checkout')) || [];

  checkout.forEach((reserva, index) => {
    checkoutOptions.innerHTML += `
      <div>
        <strong>${reserva.nome}</strong> - Quarto: ${reserva.quarto} - Data de Saída: ${reserva.dataSaida}
        <button onclick="realizarCheckout(${index})">Confirmar Check-out</button>
      </div>
    `;
  });
};

// Função de realizar check-out
function realizarCheckout(index) {
  const checkout = JSON.parse(localStorage.getItem('checkout')) || [];
  const reservaCheckout = checkout.splice(index, 1)[0];  // Remove a reserva do array

  let historico = JSON.parse(localStorage.getItem('historico')) || [];
  historico.push(reservaCheckout);  // Adiciona ao histórico
  localStorage.setItem('historico', JSON.stringify(historico));  // Salva no histórico

  localStorage.setItem('checkout', JSON.stringify(checkout));  // Atualiza o checkout

  window.location.href = 'reserva.html';  // Redireciona para a página de reservas
}

// Logout
document.getElementById('voltarBtn').addEventListener('click', function() {
  window.location.href = 'reserva.html';  // Redireciona para o login
});

