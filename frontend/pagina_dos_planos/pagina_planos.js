
const avatar = document.querySelector('#avatar');
const login = document.querySelector('#login-icon');
const id = localStorage.getItem('id_salvo');

const params = new URLSearchParams(window.location.search);
const planoAtual = params.get('id');
const p1 = document.querySelector('#p1');
const p2 = document.querySelector('#p2');
const p3 = document.querySelector('#p3');
const assinar = document.querySelector('#assinar');
const img = document.querySelector('#img');

login.addEventListener('click', ()=>{
    if(!id){ window.location.href = '../login/login.html'; }
    else{ window.location.href = '../perfil/perfil.html'; }
});

if(id != null ){
    document.addEventListener('DOMContentLoaded', async () => {
    const nome = document.querySelector('#nome');
    const descricao = document.querySelector('#desc');



    if(planoAtual == 1){
        nome.innerText = 'plano caixa';
        descricao.innerText = 'plano caixa';
        img.src = '../../imagens/planobase.png';
    }else if(planoAtual == 2){
        nome.innerText = 'plano caixas';
        descricao.innerText = 'plano caixas';
        img.src = '../../imagens/planomedio.png';
    }else if(planoAtual == 3){
        nome.innerText = 'plano caixa(s)³';
        descricao.innerText = 'plano caixa(s)³';
        img.src = '../../imagens/planoultra.png';
    };
    
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

p1.addEventListener('click', ()=>{ window.location.href = '../pagina_dos_planos/pagina_planos.html?id=1' });
p2.addEventListener('click', ()=>{ window.location.href = '../pagina_dos_planos/pagina_planos.html?id=2' });
p3.addEventListener('click', ()=>{ window.location.href = '../pagina_dos_planos/pagina_planos.html?id=3' });

assinar.addEventListener('click', async ()=>{
    try{
        const payload = {
            id_usuario : id,
            plano : planoAtual,
        };

        const resp = await fetch(`http://192.168.1.57:3000/assinar`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });

        if (!resp.ok) {
            const erro = await resp.json().catch(()=>({erro:'Falha'}));
            alert(erro.erro || 'Erro ao cadastrar');
            return;
        }
        alert('plano assinado com sucesso')
    } catch (err) {
        console.error(err);
        alert('Erro de rede/servidor');
    }
})