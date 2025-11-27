// Recupera os dados do professor logado
const professorLogado = JSON.parse(localStorage.getItem('professorLogado'));

if (!professorLogado) {
  window.location.href = 'loginProfessor.html'; // Redireciona para login se o professor não estiver logado
}

// Recupera os alunos cadastrados no localStorage
const alunos = JSON.parse(localStorage.getItem('alunos')) || [];

// Filtra alunos pela matéria do professor logado
const alunosMateria = alunos.filter(a => a.curso === professorLogado.materia);

// Exibe os alunos para o professor
const alunosListaDiv = document.getElementById('alunosLista');
alunosMateria.forEach(aluno => {
  const alunoDiv = document.createElement('div');
  alunoDiv.innerHTML = `
    <h3>${aluno.nome}</h3>
    <label>A1: <input type="number" value="${aluno.notas.A1 || 0}" data-aluno-id="${aluno.usuario}" data-nota="A1"></label>
    <label>A2: <input type="number" value="${aluno.notas.A2 || 0}" data-aluno-id="${aluno.usuario}" data-nota="A2"></label>
    <label>A3: <input type="number" value="${aluno.notas.A3 || 0}" data-aluno-id="${aluno.usuario}" data-nota="A3"></label>
    <span id="percentual-${aluno.usuario}">Média: 0%</span>
  `;
  alunosListaDiv.appendChild(alunoDiv);
});

// Salva as notas alteradas no localStorage e calcula a média
document.getElementById('alunosLista').addEventListener('input', (e) => {
  if (e.target.tagName === 'INPUT') {
    const alunoId = e.target.getAttribute('data-aluno-id');
    const nota = e.target.getAttribute('data-nota');
    const valor = e.target.value;

    // Atualiza as notas do aluno
    const aluno = alunos.find(a => a.usuario === alunoId);
    if (aluno) {
      aluno.notas[nota] = parseFloat(valor);

      // Calcular a média das notas
      const media = ((aluno.notas.A1 || 0) + (aluno.notas.A2 || 0) + (aluno.notas.A3 || 0)) / 3;
      const percentual = (media).toFixed(2); // Calculando a porcentagem

      // Atualiza a média exibida
      document.getElementById(`percentual-${aluno.usuario}`).innerText = `Média: ${percentual}%`;

      // Salva os dados no localStorage
      localStorage.setItem('alunos', JSON.stringify(alunos));
    }
  }
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('professorLogado');
  window.location.href = 'loginProfessor.html'; // Redireciona para o login
});
