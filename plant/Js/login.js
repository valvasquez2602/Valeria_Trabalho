const formulario = document.getElementById('formulario');

if (formulario) {
    formulario.addEventListener('submit', (e) => {
        e.preventDefault();

        const usuario = document.getElementById('usuario').value.trim();
        const senha = document.getElementById('senha').value.trim();

        if (!usuario || !senha) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Busca usuários cadastrados no localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);

        if (usuarioEncontrado) {
            // Salva o usuário logado no localStorage para uso posterior
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
            alert('Login bem-sucedido!');
            window.location.href = 'conta.html';
        } else {
            alert('Usuário ou senha incorretos.');
        }
    });
}
