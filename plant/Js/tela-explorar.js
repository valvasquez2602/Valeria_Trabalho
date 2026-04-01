// Seleciona todas as imagens das plantas
const imagens = document.querySelectorAll('.planta-card-sugestao img');
const lightbox = document.getElementById('lightbox');
const imagemGrande = document.getElementById('imagem-grande');
const fechar = document.querySelector('.fechar');
const anterior = document.querySelector('.anterior');
const proximo = document.querySelector('.proximo');

let indiceAtual = 0;

// Abrir lightbox ao clicar em imagem
imagens.forEach((img, index) => {
  img.addEventListener('click', () => {
    indiceAtual = index;
    mostrarImagem();
    lightbox.style.display = 'flex';
  });
});

function mostrarImagem() {
  imagemGrande.src = imagens[indiceAtual].src;
}

// Fechar lightbox
fechar.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Navegação
proximo.addEventListener('click', () => {
  indiceAtual = (indiceAtual + 1) % imagens.length;
  mostrarImagem();
});

anterior.addEventListener('click', () => {
  indiceAtual = (indiceAtual - 1 + imagens.length) % imagens.length;
  mostrarImagem();
});

// Fechar clicando fora
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
  }
});
