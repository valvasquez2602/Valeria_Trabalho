const campoPesquisa = document.querySelector(".campo-pesquisa");

const botaoBusca = document.querySelector(".botao-busca");

const cards = document.querySelectorAll(".card-house");


botaoBusca.addEventListener("click", pesquisarPlanta);


campoPesquisa.addEventListener("keyup", function (event) {

    if (event.key === "Enter") {

        pesquisarPlanta();

    }

});


function pesquisarPlanta() {

    const texto = campoPesquisa.value.toLowerCase();

    cards.forEach((card) => {

        const titulo = card
            .querySelector("h4")
            .innerText
            .toLowerCase();

        const descricao = card
            .querySelector("p")
            .innerText
            .toLowerCase();

        if (
            titulo.includes(texto) ||
            descricao.includes(texto)
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}

/* ANIMAÇÃO NOS CARDS */

cards.forEach((card) => {

    card.addEventListener("mouseenter", () => {

        card.style.transform = "scale(1.03)";
        card.style.transition = "0.3s";

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "scale(1)";

    });

});

/* BOTÃO HERO */

const botaoHero = document.querySelector(".btn-eco");

botaoHero.addEventListener("click", () => {

    alert("🌿 Bem-vindo ao Poulls!");

});