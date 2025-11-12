const add = document.querySelector('#submitButton');

const nome = document.querySelector('#nome');
const descricao = document.querySelector('#descricao');
const preco = document.querySelector('#preco');
const material = document.querySelector('#material');
const cor = document.querySelector('#cor');
const modelo = document.querySelector('#modelo');
const origem = document.querySelector('#origem');

let modo = 1;

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
      //link.href = `../Detalhes/detalhes.html?id=${p.id_produto}`;
      link.target = "_blank";
      link.classList.add("card");

      const imagem_card = document.createElement("img");
      imagem_card.src = p.img_url;
      imagem_card.alt = `Imagem de ${p.titulo}`;

      const titulo_card = document.createElement("h5");
      titulo_card.innerText = p.nome;

      const preco_card = document.createElement("h6");
      preco_card.innerText = "R$ " + p.preco;
      

      const delete_btn = document.createElement("button");
      const modal_pergunta = document.querySelector('#containermodal');
      

      delete_btn.innerText = "🗑";
      delete_btn.addEventListener('click', async ()=>{
        modal_pergunta.style.display = 'block';

        document.querySelector('#sim').addEventListener('click', async ()=>{
        modal_pergunta.style.display = 'none';
         try {
          const resp = await fetch(`http://192.168.1.57:3000/delete/produtos/${p.id_produto}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },

          });

          const data = await resp.json().catch(() => ({}));

          if (!resp.ok) {
            alert(data.erro || "Erro ao deletar produto");
            return;
          }

          alert("Produto deletado com sucesso!");
        } catch (erro) {
          console.error("Erro ao deletar produto:", erro);
          alert("Erro de rede/servidor");
        }
      });

      document.querySelector('#nao').addEventListener('click', async ()=>{
        modal_pergunta.style.display = 'none';
      });

       
      });

      const update_btn = document.createElement("button");
      update_btn.innerText = "✏";
      update_btn.addEventListener('click', async ()=>{
        try{
          const resp = await fetch(`http://localhost:3000/produtos/${p.id_produto}`);
          if (!resp.ok) throw new Error('Erro ao buscar produto main');
          const produtoU = await resp.json();

          nome.value = produtoU.nome;
          descricao.innerText = produtoU.descricao;
          preco.value = produtoU.preco;
          material.value = produtoU.material;
          cor.value = produtoU.cor;
          modelo.value = produtoU.modelo;
          origem.value = produtoU.origem;


          modo = 2;

          const voltarBtn = document.createElement("button");
          voltarBtn.id = 'voltarbtn';
          voltarBtn.innerText = "adicionar novo produto";
          voltarBtn.onclick = addNewP;

        }catch(error){

        }
      });

      link.appendChild(imagem_card);
      link.appendChild(titulo_card);
      link.appendChild(preco_card);
      link.appendChild(delete_btn);
      link.appendChild(update_btn);

      div_content.appendChild(link);
    });
  } catch (erro) {
    console.error(erro);
    div_content.innerHTML = "<p>Não foi possível carregar os produtos no momento.</p>";
  }
});

function addNewP(){
  nome.value = '';
  descricao.innerText = '';
  preco.value = '';
  material.value = '';
  cor.value = '';
  modelo.value = '';
  origem.value = '';

  modo=1;
}


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