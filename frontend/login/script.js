const form = document.querySelector('#login-form');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.querySelector('#email').value.trim();
  const senha = document.querySelector('#password').value;

  try {
    const resp = await fetch('http://192.168.1.57:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });

    const data = await resp.json();

    if (!resp.ok) {
      alert(data.erro || 'Falha ao fazer login');
      return;
    }

    localStorage.setItem('id_salvo', data.id_usuario);

    window.location.href = '../catalogo/index.html';
  } catch (err) {
    console.error('Erro ao autenticar:', err);
    alert('Erro no servidor');
  }
});
