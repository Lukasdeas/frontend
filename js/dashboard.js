// dashboard.js
const API_BASE_URL = 'https://agendamento-xf4a.onrender.com'; // URL do seu backend no Render

document.getElementById('agendamentoForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch(`${API_BASE_URL}/agendamento`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    if (response.ok) {
        alert('Agendamento realizado com sucesso!');
        this.reset();
        loadAgendamentos(); // Recarregar a lista de agendamentos após um novo agendamento
    } else {
        alert('Erro ao agendar. Verifique os dados e tente novamente.');
    }
});

// Função para buscar e exibir agendamentos
async function loadAgendamentos() {
    const lista = document.getElementById('listaAgendamentos');
    lista.innerHTML = ''; // Limpa a lista antes de recarregar

    const res = await fetch(`${API_BASE_URL}/agendamento`);
    const agendamentos = await res.json();

    agendamentos.forEach(item => {
        const div = document.createElement('div');
        div.textContent = `${item.data} - ${item.hora} | ${item.paciente} (${item.status})`;
        lista.appendChild(div);
    });
}

// Buscar agendamentos ao carregar a página
window.addEventListener('load', loadAgendamentos);
