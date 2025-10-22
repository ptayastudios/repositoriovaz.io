const api = 'http://localhost:3000';

document.querySelector('#form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = {
    nome: document.querySelector('#nome').value.trim(),
    email: document.querySelector('#email').value.trim().toLowerCase(),
    senha: document.querySelector('#password').value,

  };

  try {
    const resp = await fetch(`${api}/contas`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!resp.ok) {
      const erro = await resp.json().catch(()=>({erro:'Falha'}));
      alert(erro.erro || 'Erro ao cadastrar');
      return;
    }

    const user = await resp.json(); // {id_usuario, nome, email, foto_url}

    localStorage.setItem('id_salvo', user.id_usuario);
    localStorage.setItem('userNome', user.nome || '');
    //localStorage.setItem('userFoto', user.foto_url || '');

    window.location.href = '../catalogo/index.html';
  } catch (err) {
    console.error(err);
    alert('Erro de rede/servidor');
  }
});

