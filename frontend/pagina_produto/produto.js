const params = new URLSearchParams(window.location.search);
const id = params.get('id');
const id_user = localStorage.getItem("id_salvo");



const botao_comprar = document.querySelector('#comprabotao');
const img = document.querySelector('#img');
const nome = document.querySelector('#nome');
const preco = document.querySelector('#preco');
const dsc = document.querySelector('#dsc');
const esp = document.querySelector('#esp');

const quantidade = document.querySelector('#quantidade');
const tamanho = document.querySelector('#size');

let total_ = 0;

const avatar = document.querySelector('#avatar');
const login = document.querySelector('#login-icon');

login.addEventListener('click', ()=>{
    if(!id){ window.location.href = '../login/login.html'; }
    else{ window.location.href = '../perfil/perfil.html'; }
});

document.addEventListener('DOMContentLoaded', async ()=>{
    try{
          if(id_user != null){
          const respc = await fetch(`http://localhost:3000/contas/${id_user}`);
          if (!respc.ok) throw new Error('Erro ao buscar conta');

          const conta = await respc.json();

          if (conta.img_url) { avatar.src = conta.img_url; }
          else { avatar.src = '../../imagens/perfil.png'; }
        }
        const resp = await fetch(`http://localhost:3000/produtos/${id}`);
        if (!resp.ok) throw new Error('Erro ao buscar produto main');
        const produto = await resp.json();

        img.src = produto.img_url;
        nome.innerText = produto.nome;
        preco.innerText = produto.preco;
        dsc.innerText = produto.descricao;
        total_ = Number(produto.preco);

        esp.innerHTML = `
        <li>Material: ${produto.material} </li>
        <li>Cor: ${produto.cor} </li>
        <li>Modelo: ${produto.modelo} </li>
        <li>Garantia: nunca </li>
        <li>Origem: ${produto.origem} </li>
        `

    }catch(error){
        console.error('teupaieviado', error);
    }
});

botao_comprar.addEventListener("click", async () => {
    
    

    if(id != null){
      if (id_user) {
        const resp = await fetch("http://192.168.1.57:3000/comprar", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            total: total_,
            id_produto: id,
            id_user: id_user,
          }),
        });
        //modal compra
        if (resp.status == 201) {
          const modal_compra = document.querySelector('#modal-compra');
          const ir_para_compra = document.querySelector('#irparacompra');
          const continuar_comprando = document.querySelector('#continuarcomprando');

          modal_compra.style.display = 'block';

          ir_para_compra.addEventListener('click', () => {
            window.location.href = '../carrinho/carrinho.html';
          });

          continuar_comprando.addEventListener('click', () => {
            modal_compra.style.display = 'none';
          });
        }
      } else {
        window.location.href = "../Login/login.html";
      }
    }else{
      alert('voçê precisa estar logado para comprar produtos');
    }
  });

  

  //modal carrinho

  const modal_carrinho = document.querySelector('#modal-carrinho');
  const ir_carrinho = document.querySelector('#ir-carrinho');
  const continuar_comprando = document.querySelector('#continuar-comprando');

  
    carrinhobotao.addEventListener('click', () => {
      if(id_user != null){  
        modal_carrinho.style.display = 'block';
        carrinhoAdd();
      }
      else{  window.location.href = '../login/login.html';  }
    }
    );

    ir_carrinho.addEventListener('click', () => {
      window.location.href = '../carrinho/carrinho.html';
    });

    continuar_comprando.addEventListener('click', () => {
      modal_carrinho.style.display = 'none';
    });
  
  

    function carrinhoAdd(){
      let carrinhoAtual = JSON.parse(localStorage.getItem('carrinho')) || [];
      carrinhoAtual.push(params.get('id'));
      localStorage.setItem('carrinho', JSON.stringify(carrinhoAtual));
      console.log(localStorage.getItem('carrinho'));
    }
  





    



  
/*
const p1_img = document.querySelector('#p1-img');
const p1_name = document.querySelector('#p1-img');
const p1_price = document.querySelector('#p1-img');

const p2_img = document.querySelector('#p2-img');
const p2_name = document.querySelector('#p2-name');
const p2_price = document.querySelector('#p2-price');

const p3_img = document.querySelector('#p3-img');
const p3_name = document.querySelector('#p3-name');
const p3_price = document.querySelector('#p3-price');

    let p1 = Math.floor(Math.random() * 23);
    let p2 = Math.floor(Math.random() * 23);
    let p3 = Math.floor(Math.random() * 23);



        const p1_ = await fetch(`http://localhost:3000/produtos/${p1}`);
        const p2_ = await fetch(`http://localhost:3000/produtos/${p2}`);
        const p3_ = await fetch(`http://localhost:3000/produtos/${p3}`);

        if (!p1_.ok) throw new Error('Erro ao buscar produto1');
        if (!p2_.ok) throw new Error('Erro ao buscar produto2');
        if (!p3_.ok) throw new Error('Erro ao buscar produto3');

        const produto1 = await p1_.json();
        const produto2 = await p2_.json();
        const produto3 = await p3_.json();

        p1_img = produto1.img_url || 'ww.png';
        p1_name = produto1.nome || 'caixa -----';
        p1_price = produto1.preco || 121212.12;

        p2_img = produto2.img_url || 'ww.png';
        p2_name = produto2.nome || 'caixa -----';
        p2_price = produto2.preco || 121212.12;

        p3_img = produto3.img_url || 'ww.png';
        p3_name = produto3.nome || 'caixa -----';
        p3_price = produto3.preco || 121212.12;


*/


