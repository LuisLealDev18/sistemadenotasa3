const token = localStorage.getItem('token');

if (!token) {
  window.location.href = 'login.html'; // Redireciona se não houver token
} else {
  fetch('http://localhost:3000/api/areaAluno', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("alunoNome").innerText = data.aluno.nome;
    document.getElementById("curso").innerText = data.aluno.curso;
    document.getElementById("status").innerText = data.aluno.status;

    const aulasLista = document.getElementById("aulasLista");
    if (!data.aulas || data.aulas.length === 0) {
      aulasLista.innerHTML = "<li>Sem aulas agendadas.</li>";
    } else {
      data.aulas.forEach(aula => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${aula.data}</strong> - ${aula.titulo}`;
        aulasLista.appendChild(li);
      });
    }
  })
  .catch(err => {
    console.error('Erro ao carregar dados do aluno:', err);
    window.location.href = 'login.html'; // Redireciona em caso de erro
  });
}
