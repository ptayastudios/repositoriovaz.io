//ve esse script aqui e coloca as coisas certas na pagina de pesquisa
const login = document.querySelector("#avatar");
const id = localStorage.getItem('id_salvo');
const totalE = document.querySelector('#total-value');

const params = new URLSearchParams(window.location.search);
const pesq = params.get('pesquisa');

const carrinho = JSON.parse(localStorage.getItem('carrinho'));

let total = 0;

login.addEventListener('click', ()=>{
    if(!id){ window.location.href = '../login/login.html'; }
    else{ window.location.href = '../perfil/perfil.html'; }
});

function renderizarProdutos(produtos) {
    console.log(produtos);
    const div_content = document.querySelector("#carrinhoitens");
    div_content.innerHTML = '';
    console.log('teste');
    produtos.forEach((p) => {
        console.log('teste2');
        total += Number(p.preco);
        const link = document.createElement("a");
        link.href = `../Detalhes/detalhes.html?id=${p.id_produto}`;
        link.target = "_blank";
        link.classList.add("card");

        const imagem_card = document.createElement("img");
        imagem_card.src = p.img_url;
        imagem_card.alt = `Imagem de ${p.titulo}`;

        const titulo_card = document.createElement("h5");
        titulo_card.innerText = p.nome;

        const preco_card = document.createElement("h6");
        preco_card.innerText = "R$ " + p.preco;

        

        link.appendChild(imagem_card);
        link.appendChild(titulo_card);
        link.appendChild(preco_card);


        div_content.appendChild(link);

        
    });
    totalE.innerText = total;
  }





async function buscarProdutos() {
  try {
    let produtosTotal = [];

    for (const p of carrinho) {
      const resp = await fetch(`http://192.168.1.57:3000/produtos/${Number(p)}`);
      if (!resp.ok) throw new Error(`Erro ao buscar produto ${Number(p)}`);
      const produto = await resp.json();
      produtosTotal.push(produto);
    }

    renderizarProdutos(produtosTotal);
  } catch (e) {
    console.error('Erro ao carregar produtos:', e);
  }
}


document.addEventListener('DOMContentLoaded', () => {
  buscarProdutos();
});





//comeca o modal de esvaziar carrinho
const modal_esvaziar = document.querySelector('#modalcontainer1');
const btn_esvaziar = document.querySelector('#confirmar-esvaziar');
const btn_cancelar = document.querySelector('#cancelar-esvaziar');

 document.querySelector('#limparcarrinho').addEventListener('click', ()=>{
    modal_esvaziar.style.display = 'block';

});

document.querySelector('#confirmar-esvaziar').addEventListener('click', ()=>{
    localStorage.clear('carrinho');
    modal_esvaziar.style.display = 'none';
    window.location.reload();
});

document.querySelector('#cancelar-esvaziar').addEventListener('click', ()=>{
    modal_esvaziar.style.display = 'none';
});
//termina o modal de esvaziar carrinho


//comeca o modal de finalizar compra
const modal_finalizar = document.querySelector('#modalcontainer2');
document.querySelector('#checkout').addEventListener('click', () => {
  modal_finalizar.style.display = 'flex';
});
document.querySelector('#confirmar-finalizar').addEventListener('click', () => {
  localStorage.removeItem('carrinho');
  modal_finalizar.style.display = 'none';
  window.location.href = '../pagina_de_pagamentokkkkk/pagina_de_pagamento.html';
});
document.querySelector('#cancelar-finalizar').addEventListener('click', () => {
  modal_finalizar.style.display = 'none';
});
//termina o modal de finalizar compra




const avatar = document.querySelector('#avatar');

login.addEventListener('click', ()=>{
    if(!id){ window.location.href = '../login/login.html'; }
    else{ window.location.href = '../perfil/perfil.html'; }
});

if(id != null ){
    document.addEventListener('DOMContentLoaded', async () => {
    
    try {
        const resp = await fetch(`http://localhost:3000/contas/${id}`);
        if (!resp.ok) throw new Error('Erro ao buscar conta');

        const conta = await resp.json();

        if (conta.img_url) { avatar.src = conta.img_url; }
        else { avatar.src = '../../imagens/perfil.png'; }
    } catch (err) {
        console.error('Erro ao carregar foto:', err);
        imgHeader.src = '../../imagens/perfil.png';
    }
    });
}









const pesquisa = document.querySelector('#search');
pesquisa.addEventListener('keyup', (e)=>{
  if(e.key === 'Enter'){ window.location.href = `../pagina_de_pesquisa/pesquisa.html?pesquisa=${pesquisa.value}`; }
});