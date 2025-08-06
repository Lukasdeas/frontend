const API_BASE_URL = 'https://agendamento-nslh.onrender.com';

document.getElementById('agendamentoForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch(`${API_BASE_URL}/agendamento`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            mode: 'cors'
        });

        if (response.ok) {
            alert('✅ Agendamento realizado com sucesso!');
            this.reset();
            loadAgendamentos();
        } else {
            const err = await response.json();
            alert(`❌ Erro ao agendar: ${err.detail || 'Verifique os dados.'}`);
        }
    } catch (error) {
        alert(`❌ Erro na conexão: ${error.message}`);
    }
});

async function loadAgendamentos() {
    const lista = document.getElementById('listaAgendamentos');
    lista.innerHTML = '<em>Carregando agendamentos...</em>';

    try {
        const res = await fetch(`${API_BASE_URL}/agendamento`, { mode: 'cors' });
        const agendamentos = await res.json();
        lista.innerHTML = '';

        agendamentos.forEach(item => {
            const div = document.createElement('div');
            div.textContent = `${item.data} - ${item.hora} | ${item.paciente} (${item.status})`;
            lista.appendChild(div);
        });
    } catch (error) {
        lista.innerHTML = '<strong>Erro ao carregar agendamentos.</strong>';
    }
}

window.addEventListener('load', loadAgendamentos);
