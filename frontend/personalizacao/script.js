const add = document.querySelector('#submitButton');

add.addEventListener('click', async (e)=>{
    e.preventDefault();
   // if(nome == null || ! descricao == null || preco == null || material == null || cor == null || modelo == null || origem == null) alert('todos os campos são obrigatorios');
    //else{
        const payload = {
            nome: document.querySelector('#nome'),
            descricao: document.querySelector('#descricao'),
            preco: document.querySelector('#preco'),
            material: document.querySelector('#material'),
            cor: document.querySelector('#cor'),
            modelo: document.querySelector('#modelo'),
            origem: document.querySelector('#origem')
        };

        try{
            const resp = await fetch(`http://localhost:3000/produtos`, {
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
           alert("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa!!!!!!!!!!!!!!!!!!!!!!!!")
        } catch (err) {
            console.error(err);
            alert('Erro de rede/servidor');
        }
    //  }
});