


const pesquisa = document.querySelector('#search');



pesquisa.addEventListener('keyup', (e)=>{
  if(e.key === 'Enter'){ window.location.href = `../pagina_de_pesquisa/pesquisa.html?pesquisa=${pesquisa.value}`; }
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









/*
(function () {
  const header = document.querySelector('header');
  if (!header) return;

  let lastScroll = window.scrollY || 0;
  let ticking = false;
  const delta = 10;
  const upShowAtTop = 64;


  header.classList.add('header--pinned');

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const current = window.scrollY || 0;
        const diff = current - lastScroll;


        if (Math.abs(diff) < delta) {
          ticking = false;
          return;
        }

        if (current <= upShowAtTop) {

          header.classList.remove('header--hidden');
          header.classList.add('header--pinned');
        } else if (diff > 0 && current > lastScroll) {

          header.classList.add('header--hidden');
          header.classList.remove('header--pinned');
        } else if (diff < 0) {

          header.classList.remove('header--hidden');
          header.classList.add('header--pinned');
        }

        lastScroll = current;
        ticking = false;
      });
      ticking = true;
    }
  }


  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches ? e.touches[0].clientY : 0;
  }, { passive: true });


  window.addEventListener('scroll', onScroll, { passive: true });


  window.addEventListener('resize', () => {
    lastScroll = window.scrollY || 0;
    header.classList.remove('header--hidden');
    header.classList.add('header--pinned');
  });
})();




/*
    se sentindo vazio?venha para a vaz.io
    uma caixa vazia, mas que te traz alegria
    a caixa que preenche o seu vazio
    vaz.io, o nada a preco de tudo
    a critica na sua cara, mas com numeros de mais pra ver
    nada... padronizado, com estampa e o preço da sua casa
    o vazio, cuidadosamente cauculado. O nada diagramado com perfeição. A ausencia, escondida atras de numeros
*/