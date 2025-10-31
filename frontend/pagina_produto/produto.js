const params = new URLSearchParams(window.location.search);
const id = params.get('id');

const botao_comprar = document.querySelector('.comprabotao');
const img = document.querySelector('#img');
const nome = document.querySelector('#nome');
const preco = document.querySelector('#preco');
const dsc = document.querySelector('#dsc');
const esp = document.querySelector('#esp');

const quantidade = document.querySelector('#quantidade');
const tamanho = document.querySelector('#size');


document.addEventListener('DOMContentLoaded', async ()=>{
    try{
        const resp = await fetch(`http://localhost:3000/produtos/${id}`);
        if (!resp.ok) throw new Error('Erro ao buscar produto main');
        const produto = await resp.json();

        img.src = produto.img_url;
        nome.innerText = produto.nome;
        preco.innerText = produto.preco;
        dsc.innerText = produto.descricao;

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
    const id_user = localStorage.getItem("id_salvo");
    if (id_user) {
      const resposta = await fetch("http://localhost:3000/comprar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          total: produto.preco,
          id_produto: produto.id,
          id_user: id_user,
        }),
      });
      if (resposta.status == 201) {
        alert("Parabens pela compra!");
      }
    } else {
      window.location.href = "../Login/login.html";
    }
  });



  



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