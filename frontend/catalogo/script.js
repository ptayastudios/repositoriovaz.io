









const login = document.querySelector('#login-icon');
const avatar = document.querySelector('#avatar');
const id = localStorage.getItem('id_salvo');

login.addEventListener('click', ()=>{
    

    if(!id){ window.location.href = '../login/login.html'; }
    else{ window.location.href = '../perfil/perfil.html'; }
});




if(id != null ){
    document.addEventListener('DOMContentLoaded', async () => {
    const id = localStorage.getItem('id_salvo');
    const imgHeader = document.querySelector('#avatar');

    try {
        const resp = await fetch(`http://localhost:3000/contas/${id}`);
        if (!resp.ok) throw new Error('Erro ao buscar conta');

        const conta = await resp.json();

        if (conta.img_url) {
        imgHeader.src = conta.img_url;
        } else {
        // imagem padrão se o usuário não tiver uma foto
        imgHeader.src = '../../imagens/perfil.png';
        }
    } catch (err) {
        console.error('Erro ao carregar foto:', err);
        // fallback padrão
        imgHeader.src = '../../imagens/perfil.png';
    }
    });
}


