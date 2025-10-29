const form = document.querySelector('#login-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.querySelector('#email').value.trim();
  const senha = document.querySelector('#password').value;

  try {
    const resp = await fetch('http://localhost:3000/contas');
    if (!resp.ok) throw new Error('Falha ao buscar contas');
    const contas = await resp.json();

    let conta = contas.find(c => c.email === email && c.senha === senha);

    if (conta) {
      localStorage.setItem('id_salvo', conta.id_usuario);
      window.location.href = '../catalogo/index.html';
    } else {
      alert('Credenciais inválidas');
    }
  } catch (err) {
    console.error(err);
    alert('Erro ao autenticar');
  }
});