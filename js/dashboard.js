/* dashboard.js */
function showSection(sectionId) {
  document.querySelectorAll('section').forEach(sec => sec.classList.remove('active-section'));
  document.getElementById(sectionId).classList.add('active-section');
}

document.getElementById('agendamentoForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  const response = await fetch('https://agendamentos-ytzc.onrender.com', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    alert('Agendamento realizado!');
    this.reset();
  } else {
    alert('Erro ao agendar.');
  }
});

// Buscar agendamentos
window.addEventListener('load', async () => {
  const lista = document.getElementById('listaAgendamentos');
  const res = await fetch('https://agendamentos-ytzc.onrender.com');
  const agendamentos = await res.json();

  agendamentos.forEach(item => {
    const div = document.createElement('div');
    div.textContent = `${item.data} - ${item.hora} | ${item.paciente} (${item.status})`;
    lista.appendChild(div);
  });
});
