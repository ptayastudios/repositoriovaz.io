//ve esse script aqui e coloca as coisas certas na pagina de pesquisa
const login = document.querySelector("#avatar");
const id = localStorage.getItem('id_salvo');

const params = new URLSearchParams(window.location.search);
const pesq = params.get('pesquisa');

const carrinho = JSON.parse(localStorage.getItem('carrinho'));

// login.addEventListener('click', ()=>{
//     if(!id){ window.location.href = '../login/login.html'; }
//     else{ window.location.href = '../perfil/perfil.html'; }
// });

function renderizarProdutos(produtos) {
    console.log(produtos);
    const div_content = document.querySelector("#carrinhoitens");
    div_content.innerHTML = '';
    console.log('teste');
    produtos.forEach((p) => {
        console.log('teste2');
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


document.addEventListener('DOMContentLoaded', () => buscarProdutos());

document.querySelector('#limparcarrinho').addEventListener('click', ()=>{
    localStorage.clear('carrinho');
})
