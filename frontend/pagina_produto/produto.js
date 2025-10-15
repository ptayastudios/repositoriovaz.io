const params = new URLSearchParams(window.location.search);
const id = params.get('id');


const img = document.querySelector('#img');
const nome = document.querySelector('#nome');
const preco = document.querySelector('#preco');
const dsc = document.querySelector('#dsc');

const quantidade = document.querySelector('#quantidade');
const tamanho = document.querySelector('#size');



document.addEventListener('DOMContentLoaded', async ()=>{

    try{

        const resp = await fetch(`http://localhost:3000/produtos/${id}`);
        if (!resp.ok) throw new Error('Erro ao buscar produto');

        const produto = await resp.json();


        img.src = produto.img_url;
        nome.innerText = produto.nome;
        preco.innerText = produto.preco;
        dsc.innerText = produto.descricao;

    }catch(error){
        console.error('teupaieviado', error);
    }
});