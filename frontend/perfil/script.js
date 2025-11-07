const id = localStorage.getItem('id_salvo');
const apiUrl = `http://192.168.1.57:3000/contas/${id}`;



const nomeInput = document.querySelector("#nome");
const emailInput = document.querySelector("#email-edit");
const senhaInput = document.querySelector("#senha");
const cepInput = document.querySelector("#cep");
const telInput = document.querySelector("#telefone");
const descInput = document.querySelector("#modal-desc");
const sair = document.querySelector("#sair");
const atualizar = document.querySelector("#atualizar");
const msg = document.querySelector("#msg");

const planoN = document.querySelector("#plano-nome");
const planoI = document.querySelector("#impplano");

let nivel = "";



document.addEventListener('DOMContentLoaded', async () => {
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
        const resp = await fetch(`http://192.168.1.57:3000/contas/${id}`);
        if (!resp.ok) throw new Error('Erro ao buscar conta'); 

        const conta = await resp.json();

        if (conta) {
            imgHeader.src = conta.img_url || '../../imagens/perfil.png';
            nome.innerText = conta.nome || '-----';
            nome2.innerText = conta.nome || '-----';
            descricao.innerText = conta.descricao || '-----';
            email.innerText = conta.email || '-----';

            telefone.innerText = conta.telefone || '-----';
            cep.innerText = conta.cep || '-----';
            localizacao.innerText = conta.localizacao || '-----';
        }

        nomeInput.value = conta.nome || null;
        emailInput.value = conta.email || null;
        senhaInput.value = conta.senha || null;
        cepInput.value = conta.cep || null;
        telInput.value = conta.telefone || null;
        descInput.value = conta.descricao || null;
        if(conta.plano == 3){
            planoN.innerText = "plano caixa(s)³"; 
            planoI.src = "../../imagens/planoultra.png";
        }else if(conta.plano == 2){
            planoN.innerText = "plano caixas";
            planoI.src = "../../imagens/planomedio.png";
        }else if(conta.plano == 1){
            planoN.innerText = "plano caixa";
            planoI.src = "../../imagens/planobase.png";
        }

        if(conta.nivel == "adm"){
            let admButton = document.createElement('a');
            const class_ = document.querySelector('#opcoesfodas123');

            admButton.id = 'admB';
            admButton.class = 'opt';
            admButton.href = '../personalizacao/personalizacao.html';

            admButton.textContent = 'administração';
                
            
            class_.appendChild(admButton);
        }
    } catch (err) {
        console.error('Erro ao carregar foto:', err);

        imgHeader.src = '../../imagens/logo.png';
    }
});


sair.addEventListener('click', ()=>{
    localStorage.removeItem('id_salvo');
    window.location.href = '../catalogo/index.html';
});

//FAZ AS IMAGENS DOS PLANOS MUDAR JUNTO DOS NOMES DELES FAZ FAVOR E O MODAL DA ATUALIZAÇÃO NN TÁ ATUALIZANDO OS DADOS



document.querySelector("#editar").addEventListener("submit", async (e) => {
  e.preventDefault();


  const dadosAtualizados = {};
  if (nomeInput.value.trim() != null){ dadosAtualizados.nome = nomeInput.value.trim() };
  if (emailInput.value.trim() != null){ dadosAtualizados.email = emailInput.value.trim() };
  if (senhaInput.value.trim() != null){ dadosAtualizados.senha = senhaInput.value.trim() };
  if (telInput.value.trim() != null){ dadosAtualizados.tel = telInput.value.trim() };
  if (cepInput.value.trim() != null){ dadosAtualizados.cep = cepInput.value.trim() };
  if (descInput.value.trim() != null){ dadosAtualizados.desc = descInput.value.trim() };

  if (Object.keys(dadosAtualizados).length === 0) {
    msg.textContent = "Nenhum campo foi alterado.";
    return;
  }

  try {
    const resp = await fetch(apiUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dadosAtualizados)
    });

    window.location.href = '../perfil/perfil.html';

  } catch (error) {
    console.error(error);
    msg.textContent = "Erro ao conectar com o servidor.";
  }
});


const modalperfil = document.querySelector("#modalPerfil");
const abrirModal = document.querySelector("#abrirModal");
const fecharModal = document.querySelector(".fechar");

abrirModal.addEventListener("click", ()=>{
    modalperfil.style.display = "flex";
});

fecharModal.addEventListener("click", ()=>{
    modalperfil.style.display = "none";
});

window.addEventListener("click", (event)=>{
    if(event.target === modalperfil){
        modalperfil.style.display = "none";
    }
}); 








/*
atualizar.addEventListener("click", async ()=>{
    const nome = document.querySelector("#nome");
    const email = document.querySelector("#email-edit");
    const tel = document.querySelector("#tel");
    const cep = document.querySelector("#cep");
    const senha = document.querySelector("#senha");

    const id = document.localStorage.getItem('id_salvo');

    const resp = await fetch(`http://localhost:3000/contas/${id}`);
    if(!resp.ok){throw error('erro ao buscar conta')};
    
    const conta = await resp.json();

    nome = conta.nome ?? "";
    email = conta.nome ?? "";
    tel = conta.telefone ?? "";
    cep = conta.cep ?? "";
    senha = conta.senha ?? "";

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