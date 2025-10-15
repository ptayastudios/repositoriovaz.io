const sair = document.querySelector("#sair");
const atualizar = document.querySelector("#atualizar");



document.addEventListener('DOMContentLoaded', async () => {
    const id = localStorage.getItem('id_salvo');

    const imgHeader = document.querySelector('#avatar');
    const descricao = document.querySelector('#info-descricao');
    const nome = document.querySelector('#info-nome');
    const nome2 = document.querySelector('#info-nome2');
    const email = document.querySelector('#info-email');
    const telefone = document.querySelector('#info-telefone');
    const cep = document.querySelector('#info-cep');
    const localizacao = document.querySelector('#info-localizacao');


    if (!imgHeader || !id) return;

    try {
        const resp = await fetch(`http://localhost:3000/contas/${id}`);
        if (!resp.ok) throw new Error('Erro ao buscar conta');

        const conta = await resp.json();

        if (conta.img_url) {
            imgHeader.src = conta.img_url;
            nome.innerText = conta.nome || '-----';
            nome2.innerText = conta.nome || '-----';
            descricao.innerText = conta.descricao || '-----';
            email.innerText = conta.email || '-----';

            telefone.innerText = conta.telefone || '-----';
            cep.innerText = conta.cep || '-----';
            localizacao.innerText = conta.localizacao || '-----';
        } else {
        // imagem padrão se o usuário não tiver uma foto
        imgHeader.src = '../../imagens/logo.png';
        }
    } catch (err) {
        console.error('Erro ao carregar foto:', err);
        // fallback padrão
        imgHeader.src = '../../imagens/logo.png';
    }
});


sair.addEventListener('click', ()=>{
    localStorage.removeItem('id_salvo');
    window.location.href = '../catalogo/index.html';
});







atualizar.addEventListener("click", ()=>{
    const nome = document.querySelector("#nome");
    const email = document.querySelector("#email");
    const tel = document.querySelector("#tel");
    const cep = document.querySelector("#cep");
    const senha = document.querySelector("#senha");



});






/*
const modal = document.querySelector("#modalPerfil");
const btn = document.querySelector("#editar");
const span = document.querySelector(".fechar");

    btn.addEventListener('click', ()=>{
        modal.style.display = "flex";
    });
    span.addEventListener('click', ()=>{
        modal.style.display = "none";
    });
    window.addEventListener('click', (event)=>{
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
    
*/