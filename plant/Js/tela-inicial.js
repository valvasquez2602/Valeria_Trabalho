// Lista de plantas adicionadas
let plantasAdicionadas = JSON.parse(localStorage.getItem('plantasAdicionadas')) || [];

const menuLateral = document.querySelector('.menu-lateral');
const btnExpandir = document.querySelector('.bnt-expandir');

if (btnExpandir) {
    btnExpandir.addEventListener('click', () => {
        menuLateral.classList.toggle('expanded');
    });
}

const searchIcon = document.querySelector('.bi-search');
const searchInput = document.querySelector('.pesquisa-txt');

if (searchIcon && searchInput) {
    searchIcon.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            console.log('Searching for:', query);
            alert('Searching for: ' + query);
        } else {
            alert('Please enter a search term.');
        }
    });
}

const fileInput = document.getElementById('file-input');
const botaoAdicionar = document.getElementById('botao-adicionar');
const botaoRemover = document.getElementById('botao-remover');

if (botaoAdicionar) {
    botaoAdicionar.addEventListener('click', () => {
        fileInput.click();
    });
}

if (fileInput) {
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageUrl = e.target.result;
                const nomePlanta = prompt('Digite o nome da planta:');
                if (nomePlanta) {
                    adicionarPlanta(nomePlanta, imageUrl);
                }
            };
            reader.readAsDataURL(file);
        }
    });
}

// Removed the remove button event listener

// Função para adicionar planta
function adicionarPlanta(nome, imagem) {
    plantasAdicionadas.push({ nome, imagem });
    localStorage.setItem('plantasAdicionadas', JSON.stringify(plantasAdicionadas));
    exibirPlantasAdicionadas();
}

// Função para remover planta
function removerPlanta(index) {
    plantasAdicionadas.splice(index, 1);
    localStorage.setItem('plantasAdicionadas', JSON.stringify(plantasAdicionadas));
    exibirPlantasAdicionadas();
}

// Função para exibir plantas adicionadas
function exibirPlantasAdicionadas() {
    const mainContent = document.querySelector('.main-content');
    // Remove existing plant cards
    const existingPlants = mainContent.querySelectorAll('.planta-card');
    existingPlants.forEach(card => card.remove());

    plantasAdicionadas.forEach((planta, index) => {
        const adicaoDiv = document.createElement('div');
        adicaoDiv.className = 'adicao planta-card';
        adicaoDiv.innerHTML = `
            <div class="planta-adicionada-item">
                <img src="${planta.imagem}" alt="${planta.nome}">
                <p>${planta.nome}</p>
                <button class="botao-remover-planta" data-index="${index}">×</button>
            </div>
        `;
        mainContent.appendChild(adicaoDiv);
    });

    // Add event listeners for remove buttons
    document.querySelectorAll('.botao-remover-planta').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = parseInt(e.target.getAttribute('data-index'));
            removerPlanta(index);
        });
    });
}

// Carregar plantas ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    exibirPlantasAdicionadas();
});
