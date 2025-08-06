/* dashboard.js */
function showSection(sectionId) {
  document.querySelectorAll('section').forEach(sec => sec.classList.remove('active-section'));
  document.getElementById(sectionId).classList.add('active-section');
}

// Substitua 'https://SUA_URL_DO_RENDER.onrender.com' pela URL real do seu serviço FastAPI no Render
const API_BASE_URL = 'https://agendamento-xf4a.onrender.com'; // Assumindo que esta é a URL base do seu serviço Render

document.getElementById('agendamentoForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  const response = await fetch(`${API_BASE_URL}/agendamento`, { // Adicionado /agendamento
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    alert('Agendamento realizado!');
    this.reset();
    // Opcional: Recarregar a lista de agendamentos após um novo agendamento
    loadAgendamentos();
  } else {
    alert('Erro ao agendar.');
  }
});

// Função para buscar e exibir agendamentos
async function loadAgendamentos() {
  const lista = document.getElementById('listaAgendamentos');
  lista.innerHTML = ''; // Limpa a lista antes de recarregar

  const res = await fetch(`${API_BASE_URL}/agendamento`); // Adicionado /agendamento
  const agendamentos = await res.json();

  agendamentos.forEach(item => {
    const div = document.createElement('div');
    div.textContent = `${item.data} - ${item.hora} | ${item.paciente} (${item.status})`;
    lista.appendChild(div);
  });
}

// Buscar agendamentos ao carregar a página
window.addEventListener('load', loadAgendamentos);
