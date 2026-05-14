const week = document.getElementById("week");

const days = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"];

// exemplo de dados
let tasks = JSON.parse(localStorage.getItem("tasks")) || {};

function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask(day) {
  const text = prompt("O que você quer fazer nesse dia?");
  if (!text) return;

  if (!tasks[day]) tasks[day] = [];
  tasks[day].push(text);

  save();
  render();
}

function render() {
  week.innerHTML = "";

  days.forEach((day, index) => {

    // regra simples: regar 2x na semana (ex: terça e sábado)
    const waterDay = index === 1 || index === 5;

    const card = document.createElement("div");
    card.className = "col-md-6";

    card.innerHTML = `
      <div class="day-card ${waterDay ? "water" : ""}">
        <div class="day-title">
          ${day} ${waterDay ? "💧 regar plantas" : ""}
        </div>

        <div id="tasks-${index}">
          ${(tasks[index] || []).map(t => `<div class="task">🌱 ${t}</div>`).join("")}
        </div>

        <button class="btn btn-sm btn-success mt-2" onclick="addTask(${index})">
          + adicionar
        </button>
      </div>
    `;

    week.appendChild(card);
  });
}

render();