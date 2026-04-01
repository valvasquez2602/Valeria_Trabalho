// Verifica se o usuário está logado
const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
if (!usuarioLogado) {
  alert('Você precisa fazer login primeiro.');
  window.location.href = 'login.html';
}

// Seleciona elementos
const editarBtn = document.getElementById('editarBtn');
const inputFoto = document.getElementById('inputFoto');
const fotoPerfil = document.getElementById('fotoPerfil');
const imgFoto = document.getElementById('img-foto');

// Carrega a foto de perfil salva, se existir
const fotoSalva = localStorage.getItem(`fotoPerfil_${usuarioLogado.usuario}`);
if (fotoSalva) {
  imgFoto.src = fotoSalva;
}

// Quando clicar no botão, abre o seletor de arquivos
editarBtn.addEventListener('click', () => {
  inputFoto.click();
});

// Quando escolher uma nova foto
inputFoto.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fotoURL = e.target.result;
      // Salva a foto no localStorage associada ao usuário
      localStorage.setItem(`fotoPerfil_${usuarioLogado.usuario}`, fotoURL);
      if (imgFoto) {
        imgFoto.src = fotoURL;
      }
      if (fotoPerfil) {
        fotoPerfil.style.backgroundImage = `url('${fotoURL}')`;
      }
    };
    reader.readAsDataURL(file);
  }
});
