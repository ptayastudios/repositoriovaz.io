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
            const resp = await fetch(`http://localhost:3000/produtosP`, {
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