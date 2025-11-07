const add = document.querySelector('#submitButton');

add.addEventListener('click', async (e)=>{
        e.preventDefault();
        

        const payload = {
            nome : document.querySelector('#nome').value,
            descricao : document.querySelector('#descricao').value,
            preco : document.querySelector('#preco').value,
            material : document.querySelector('#material').value,
            cor : document.querySelector('#cor').value,
            modelo : document.querySelector('#modelo').value,
            origem : document.querySelector('#origem').value
 
        };

        try{
            const resp = await fetch(`http://192.168.1.57:3000/produtosP`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!resp.ok) {
                const erro = await resp.json().catch(()=>({erro:'Falha'}));
                alert(erro.erro || 'Erro ao cadastrar');
                return;
            }
           const produto_add = await resp.json(); 
           alert('produto adicionado com sucesso');

        } catch (err) {
            console.error(err);
            alert('Erro de rede/servidor');
        }
    
});






document.addEventListener('DOMContentLoaded', async ()=>{
  const div_content = document.querySelector("#caixas");
  div_content.innerHTML = '';
  //pesquisa.value = pesq;

  try {
    const resposta = await fetch("http://localhost:3000/produtos");
    if (!resposta.ok) throw new Error("Erro ao buscar produtos.");
    
    const produtos = await resposta.json();
    

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
});





const avatar = document.querySelector('#avatar');
const login = document.querySelector('#login-icon');
const id = localStorage.getItem('id_salvo');

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

// async function buscarProdutos() {
//   try {
//     console.log(pesquisaV);
    
//     const resp = await fetch(`http://192.168.1.57:3000/produtos/${pesquisaV}`);
//     if (!resp.ok) throw new Error(`Erro ao buscar produto ${pesquisaV}`);

//     if(pesquisaV == null || pesquisaV == undefined){
//       const resp = await fetch(`http://192.168.1.57:3000/produtos}`);
//       if (!resp.ok) throw new Error(`Erro ao buscar produto}`);
//     }
    
//     const produtos = await resp.json();

//     renderizarProdutos(produtos);
//   } catch (e) {
//     console.error('Erro ao carregar produtos:', e);
//   }
// }