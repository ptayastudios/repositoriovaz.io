const api = 'http://localhost:3000';

document.querySelector('#form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const nome = document.querySelector('#nome');
  const payload = {
    nome: nome.value.trim(),
    email: document.querySelector('#email').value.trim().toLowerCase(),
    senha: document.querySelector('#password').value,

  };

  
  if(nome.value.length > 3){
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

      const user = await resp.json();
      localStorage.setItem('id_salvo', user.id_usuario);
      localStorage.setItem('userNome', user.nome || '');

      window.location.href = '../catalogo/index.html';
    } catch (err) {
      console.error(err);
      alert('Erro de rede/servidor');
    }
  }else{
    alert('seu nome precisa ter mai que 3 caracteres')
  }
});

