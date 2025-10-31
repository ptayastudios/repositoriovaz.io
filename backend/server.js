import express from "express";
import cors from "cors";
import sql from "./database.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/search/:pesquisa", async (req,res) => {
  const { pesquisa } = req.params;
  try{

    if(pesquisa !== ''){
      const resultado = await sql`
        SELECT * FROM produtos
        WHERE LOWER(nome) LIKE ${'%' + pesquisa.toLowerCase() + '%'}
      `;
      return res.status(200).json(resultado);
    }

  }catch (error){

    console.error("erro ao buscar produtos", error);
    return res.status(500).json({ erro: "erro no servidor" });

  }
}); 

app.get("/produtos", async (req,res) => {
  try{
      const resultado = await sql`SELECT * FROM produtos`;
      return res.status(200).json(resultado);
  }catch (error){
    console.error("erro ao buscar produtos", error);
    return res.status(500).json({ erro: "erro no servidor" });
  }
});


app.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ erro: "Email e senha são obrigatórios" });
    }

    const resultado = await sql`
      select * from contas where email = ${email.toLowerCase()}
    `;

    if (resultado.length === 0) {
      return res.status(401).json({ erro: "Email ou senha inválidos" });
    }

    const conta = resultado[0];

    if (conta.senha !== senha) {
      return res.status(401).json({ erro: "Email ou senha inválidos" });
    }

    res.status(200).json({
      id_usuario: conta.id_usuario,
      nome: conta.nome,
      email: conta.email,
      nivel: conta.nivel
    });
  } catch (error) {
    console.error("Erro ao autenticar:", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
});



app.post('/contas', async (req, res) => {
  try {
    let { nome, email, senha } = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'nome, email e senha são obrigatórios' });
    }
    nome = String(nome).trim();
    senha = String(senha).trim();
    email = String(email).trim().toLowerCase();
    //foto_url = foto_url ? String(foto_url).trim() : null;

    const resultado = await sql`
      INSERT INTO contas (nome, email, senha)
      VALUES (${nome}, ${email}, ${senha})
      RETURNING id_usuario, nome, email, senha
    `;
  
    return res.status(201).json(resultado[0]); 
  } catch (e) {
    if (e.code === '23505') { 
      return res.status(409).json({ erro: 'email já cadastrado' });
    }
    console.error('erro ao cadastrar conta', e);
    return res.status(500).json({ erro: 'erro no servidor' });
  }
});

app.get("/contas/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await sql`SELECT * FROM contas WHERE id_usuario = ${ id }`;
    if (resultado.length === 0) {
      return res.status(404).json({ erro: "Conta não encontrada" });
    }
    res.json(resultado[0]);
  } catch (error) {
    console.error("Erro ao buscar conta:", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
});


app.put("/contas/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha} = req.body;

  try{
    // const contaAtual = await sql`SELECT * FROM contas WHERE id_usuario = ${ id }`;
    // if(contaAtual === 0) return res.status(404).json({ erro: "conta nao encontrada" });

    // const atual = contaAtual[0];

    const novoNome = nome;
    const novoEmail = email;
    const novaSenha = senha;
    //const novoCep = cep;
    //const novoTelefone = tel;  
    //const novaDesc = desc;  

    
    const atualizar = await sql`
    UPDATE contas SET
          nome = ${novoNome},
          email = ${novoEmail},
          senha = ${novaSenha},
          cep = ${novoCep},
          telefone = ${novoTelefone},
          descricao = ${novaDesc}
      WHERE id_usuario = ${id}
      RETURNING *;`

    return res.status(200).json({
      conta: atualizar[0]
    });
  }catch(error){
    console.error("Erro ao atualizar conta:", error);
    return res.status(500).json({ erro: "Erro no servidor" });
  }
});


app.post('/produtosP', async (req, res) => {
  try {
    let { nome, descricao, preco, material, cor, modelo, origem } = req.body;
    if (!nome || !descricao || !preco || !material || !cor || !modelo || !origem) {
      return res.status(400).json({ erro: 'todos os campos são obrigatorios' });
    }
    let nome_ = nome || 'bah';
    let descricao_ = descricao || 'bah';
    let preco_ = Number(preco) || 1;
    let material_ = material || 'bah';
    let cor_ = cor || 'bah';
    let modelo_ = modelo || 'bah';
    let origem_ = origem || 'bah';
    

    const resultado = await sql`
      INSERT INTO produtos (nome, descricao, preco, material, cor, modelo, origem)
      VALUES (${nome_}, ${descricao_}, ${preco_}, ${material_}, ${cor_}, ${modelo_}, ${origem_})
      RETURNING nome, descricao, preco, material, cor, modelo, origem
    `;
  
    return res.status(201).json(resultado[0]); 
  } catch (e) {
    console.error('erro ao cadastrar produto', e);
    return res.status(500).json({ erro: 'erro no servidor' });
  }
});









app.get("/produtos/:id", async (req, res) => {
  const { id } = req.params;

  try{
    const resultado = await sql`SELECT * FROM produtos WHERE id_produto = ${ id }`;
    if(resultado.length === 0){ return res.status(404).json({ erro: "produto nao encontrado" }); }

    return res.status(200).json(resultado[0]);
  }catch(error){
    console.error("erro ao buscar produto", error);
    res.status(500).json({ erro: "erro no servidor" });
  }
});



app.post("/comprar", async (req, res) => {
  const { total, id_produto, id_user } = req.body;

  const id_venda =
    await sql`insert into vendas(total, data_venda, id_user, id_produto) values(${total},${new Date()},${id_user},${id_produto}) returning id`;

  return res.status(201).json("Compra feita!");
});



app.listen(3000, () => {
  console.log("No ar!");
});