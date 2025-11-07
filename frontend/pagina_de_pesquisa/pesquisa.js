//ve esse script aqui e coloca as coisas certas na pagina de pesquisa
const login = document.querySelector("#avatar");
const id = localStorage.getItem('id_salvo');
const pesquisa = document.querySelector('#search');
const pesquisaV = document.querySelector('#search').value;
const params = new URLSearchParams(window.location.search);
const pesq = params.get('pesquisa');


function renderizarProdutos(produtos) {
  console.log(produtos);

  const div_content = document.querySelector("#produtosDiv");
  div_content.innerHTML = '';
  //pesquisa.value = pesq;

  try {
    // const resposta = await fetch("http://localhost:3000/produtos");
    // if (!resposta.ok) throw new Error("Erro ao buscar produtos.");
    
    // const produtos = await resposta.json();
    

    produtos.forEach((p) => {
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
  } catch (erro) {
    console.error(erro);
    div_content.innerHTML = "<p>Não foi possível carregar os produtos no momento.</p>";
  }

  // try{
  //   const resp = await fetch(`http://localhost:3000/contas/${id}`);
  //   if (!resp.ok) throw new Error('Erro ao buscar conta');

  //   const conta = await resp.json();
  //   if (conta.img_url) { avatar.src = conta.img_url; } else { avatar.src = '../../imagens/perfil.png'; }
  // }catch(error){
  //   console.error(error);
  //   alert('Erro de aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
  // }
}


async function buscarProdutos(pesquisaV) {
  try {
    console.log(pesquisaV);
    
    const resp = await fetch(`http://192.168.1.57:3000/search/${pesquisaV}`);
    if (!resp.ok) throw new Error(`Erro ao buscar produto ${pesquisaV}`);

    if(pesquisaV == null || pesquisaV == undefined){
      const resp = await fetch(`http://192.168.1.57:3000/produtos}`);
      if (!resp.ok) throw new Error(`Erro ao buscar produto}`);
    }
    
    const produtos = await resp.json();

    renderizarProdutos(produtos);
  } catch (e) {
    console.error('Erro ao carregar produtos:', e);
  }
}


document.addEventListener('DOMContentLoaded', () => buscarProdutos());


pesquisa.addEventListener('input', (e) => {

    e.preventDefault();
    buscarProdutos(pesquisa.value.trim());  
});




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