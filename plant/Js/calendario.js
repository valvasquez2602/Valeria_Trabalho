// Banco de dados inicial simulando a imagem com temas de plantas
const tarefasIniciais = [
    { idCelular: "seg-10", titulo: "Rega Geral Vasos", cor: "event-bright-green" },
    { idCelular: "qua-10", titulo: "Adubação Orquídeas", cor: "event-soft-green" },
    { idCelular: "sex-10", titulo: "Poda de Limpeza", cor: "event-bright-green" },
    { idCelular: "ter-11", titulo: "Plantio de Mudas", cor: "event-soft-green" },
    { idCelular: "qui-11", titulo: "Controle de Pragas", cor: "event-bright-green" },
    { idCelular: "sab-11", titulo: "Colheita Horta", cor: "event-bright-green" },
    { idCelular: "seg-08", titulo: "Checar Umidade", cor: "event-soft-green" },
    { idCelular: "qua-08", titulo: "Banho de Sol", cor: "event-bright-green" },
    { idCelular: "sex-08", titulo: "Troca de Vasos", cor: "event-soft-green" },
    { idCelular: "ter-09", titulo: "Limpar Folhas", cor: "event-soft-green" },
    { idCelular: "qui-09", titulo: "Nutrientes Líquidos", cor: "event-soft-green" },
    { idCelular: "sab-09", titulo: "Nova Iluminação", cor: "event-bright-green" }
];

function renderizarTarefa(idCelular, titulo, classeCor) {
    const celula = document.getElementById(idCelular);
    if (!celula) return;

    const hora = idCelular.split('-')[1];
    const stringHorario = `${hora} Am - ${parseInt(hora) + 1} Am`;

    celula.innerHTML = `
        <div class="event-card ${classeCor}">
            <div>
                <div class="event-title" title="${titulo}">${titulo}</div>
                <div class="event-time">${stringHorario}</div>
            </div>
        </div>
    `;
}

function inicializarCalendario() {
    tarefasIniciais.forEach(t => renderizarTarefa(t.idCelular, t.titulo, t.cor));
}

// Escutador de cliques para adicionar ou remover itens
document.querySelectorAll('.calendar-cell').forEach(celula => {
    celula.addEventListener('click', () => {
        
        // Se já tiver uma tarefa, pergunta se quer deletar
        if (celula.children.length > 0) {
            if(confirm("Deseja remover essa tarefa?")) {
                celula.innerHTML = "";
            }
            return;
        }

        // Se estiver vazia, adiciona uma nova
        const nomeTarefa = prompt("Digite o nome da atividade com as plantas:");
        
        if (nomeTarefa && nomeTarefa.trim() !== "") {
            // Alterna dinamicamente entre o verde-limão e o tom complementar do print original
            const cores = ["event-bright-green", "event-soft-green"];
            const corEscolhida = cores[Math.floor(Math.random() * cores.length)];
            
            renderizarTarefa(celula.id, nomeTarefa.trim(), corEscolhida);
        }
    });
});

window.onload = inicializarCalendario;