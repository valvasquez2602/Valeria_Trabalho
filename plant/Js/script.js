const formulario = document.getElementById('formulario');

if (formulario) {
  formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nome = document.getElementById('Nome').value.trim();
    const usuario = document.getElementById('usuario').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const confirmarSenha = document.getElementById('confirmarSenha').value.trim();

    // Verifica se os campos foram preenchidos
    if (!nome || !usuario || !senha || !confirmarSenha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    // Verifica se as senhas coincidem
    if (senha !== confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    // Busca usuários existentes ou cria array vazio
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica se o usuário já existe
    const usuarioExistente = usuarios.find(u => u.usuario === usuario);
    if (usuarioExistente) {
      alert('Usuário já cadastrado.');
      return;
    }

    // Adiciona novo usuário
    usuarios.push({ nome, usuario, senha });

    // Salva no localStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Cadastro realizado com sucesso!');
    // Redireciona para outra página
    window.location.href = "login.html";
  });
}
