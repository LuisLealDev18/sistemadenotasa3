window.onload = function() {
  // Carregar reservas do localStorage
  const reservas = JSON.parse(localStorage.getItem('reservas')) || [];

  // Preencher o calendário com as reservas
  reservas.forEach(reserva => {
    const dataEntrada = new Date(reserva.dataEntrada);
    const dataSaida = new Date(reserva.dataSaida);
    
    // Calcular o número de dias entre a entrada e a saída
    const diffTime = Math.abs(dataSaida - dataEntrada);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    // Converter o dia de entrada para o índice correspondente no calendário (assumindo que o calendário começa no dia 1)
    const startDay = dataEntrada.getDate(); // Dia de entrada
    const endDay = dataSaida.getDate(); // Dia de saída
    
    // Selecionar a linha do quarto correspondente
    const quartoId = `quarto${reserva.quarto}`;
    const quartoRow = document.getElementById(quartoId);
    
    // Encontrar o índice da coluna (dia do calendário)
    let startColumn = startDay - 1; // Ajusta o índice para a coluna do calendário
    let endColumn = endDay - 1;

    // Preencher as reservas no calendário
    for (let i = startColumn; i <= endColumn; i++) {
      const reservaDiv = quartoRow.querySelectorAll('.empty')[i]; // Seleciona o espaço vazio no dia correspondente
      if (reservaDiv) {
        reservaDiv.classList.add('reservation'); // Adiciona a classe de reserva
        reservaDiv.style.backgroundColor = getReservaColor(reserva.quarto); // Define a cor da reserva
        reservaDiv.style.width = `${(diffDays * 60)}px`; // Ajusta o tamanho da reserva conforme os dias
      }
    }
  });

  // Função para atribuir uma cor única para cada quarto
  function getReservaColor(quarto) {
    const colors = ['#42a5f5', '#ffca28', '#ff7043', '#66bb6a', '#ab47bc'];
    return colors[quarto - 1]; // Retorna a cor baseada no número do quarto
  }

  // Botão de Voltar
  document.getElementById('voltarBtn').addEventListener('click', function() {
    window.location.href = 'reserva.html';  // Redireciona para a página de reservas
  });
};
