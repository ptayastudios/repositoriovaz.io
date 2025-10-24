//ve esse script aqui e coloca as coisas certas na pagina de pesquisa
window.addEventListener("load", async () => {
  const div_content = document.querySelector("#produtosDiv");

  try {
    const resposta = await fetch("http://localhost:3000/produtos");

    if (!resposta.ok) throw new Error("Erro ao buscar produtos.");

    const produtos = await resposta.json();

    produtos.forEach((p) => {
      const link = document.createElement("a");
      link.href = `../Detalhes/detalhes.html?id=${p.id}`;
      link.target = "_blank";
      link.classList.add("card");

      const imagem_card = document.createElement("img");
      imagem_card.src = '../../imagens/ww.png';
      imagem_card.alt = `Imagem de ${p.titulo}`;

      const titulo_card = document.createElement("h5");
      titulo_card.innerText = p.titulo;

      const preco_card = document.createElement("h6");
      preco_card.innerText = "R$ " + p.preco;

      link.appendChild(imagem_card);
      link.appendChild(titulo_card);
      link.appendChild(preco_card);

      div_content.appendChild(link);
    });
  } catch (erro) {
    console.error(erro);
    div_content.innerHTML = "<p>Não foi possível carregar os produtos no momento.</p>";
  }
});
