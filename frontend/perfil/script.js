const sair = document.querySelector("#sair");
const atualizar = document.querySelector("#atualizar");
const modal = document.getElementById("modalPerfil");
const btn = document.getElementById("abrirModal");
const span = document.querySelector(".fechar");


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



atualizar.addEventListener("click", async ()=>{
    const nome = document.querySelector("#nome");
    const email = document.querySelector("#email-edit");
    const tel = document.querySelector("#tel");
    const cep = document.querySelector("#cep");
    const senha = document.querySelector("#senha");

    try{
        const resp = await fetch(`http://localhost:3000/contas/edit/${id}`);
        if(!resp.ok)throw new Error('Erro ao buscar conta');
        
    }catch(error){

    }

});



btn.onclick = function() {
    modal.style.display = "flex";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target === modal) {
    modal.style.display = "none";
    }
}




