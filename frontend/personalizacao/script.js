const add = document.querySelector('#submitButton');

add.addEventListener('click', async (e)=>{
        e.preventDefault();
        

        const payload = {
            nome_ : document.querySelector('#nome').value,
            descricao_ : document.querySelector('#descricao').value,
            preco_ : document.querySelector('#preco').value,
            material_ : document.querySelector('#material').value,
            cor_ : document.querySelector('#cor').value,
            modelo_ : document.querySelector('#modelo').value,
            origem_ : document.querySelector('#origem').value
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
           alert('produto adicionado com sucesso');

        } catch (err) {
            console.error(err);
            alert('Erro de rede/servidor');
        }
    
});