// PERFIL
window.onload = function () {
  document.getElementById("name").value = localStorage.getItem("name") || "";
  document.getElementById("email").value = localStorage.getItem("email") || "";
  document.getElementById("bio").value = localStorage.getItem("bio") || "";

  loadLevel();
  renderPlants();
};



// XP / NIVEL
let xp = parseInt(localStorage.getItem("xp")) || 0;
let level = parseInt(localStorage.getItem("level")) || 1;

function addXP(value) {
  xp += value;

  let needed = level * 50;

  if (xp >= needed) {
    xp -= needed;
    level++;
    alert("🎉 Subiu para o nível " + level + "!");
  }

  saveLevel();
  updateLevelUI();
}

function saveLevel() {
  localStorage.setItem("xp", xp);
  localStorage.setItem("level", level);
}

function loadLevel() {
  updateLevelUI();
}

function updateLevelUI() {
  let needed = level * 50;
  let percent = (xp / needed) * 100;

  document.getElementById("levelText").innerText = `Nível: ${level} 🌱`;
  document.getElementById("xpText").innerText = `${xp} / ${needed} XP`;
  document.getElementById("xpBar").style.width = percent + "%";
}

// PERFIL SAVE
function saveProfile() {
  localStorage.setItem("name", document.getElementById("name").value);
  localStorage.setItem("email", document.getElementById("email").value);
  localStorage.setItem("bio", document.getElementById("bio").value);

  addXP(5);

  alert("Perfil salvo 🌿");
}






let plants = JSON.parse(localStorage.getItem("plants")) || [];

function addPlant() {
  const input = document.getElementById("plantInput");
  const value = input.value.trim();

  if (!value) return;

  plants.push(value);
  input.value = "";

  addXP(10);

  savePlants();
  renderPlants();
}

function deletePlant(index) {
  plants.splice(index, 1);
  savePlants();
  renderPlants();
}

function savePlants() {
  localStorage.setItem("plants", JSON.stringify(plants));
}

function renderPlants() {
  const list = document.getElementById("plantList");
  list.innerHTML = "";

  if (plants.length === 0) {
    list.innerHTML = "<p class='text-muted'>Nenhuma planta 🌱</p>";
    return;
  }

  plants.forEach((plant, index) => {
    list.innerHTML += `
      <div class="plant-item">
        <span>🌿 ${plant}</span>
        <button onclick="deletePlant(${index})">X</button>
      </div>
    `;
  });
}