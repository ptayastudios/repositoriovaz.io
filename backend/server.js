import express from "express";
import cors from "cors";
import sql from "./database.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/produtos", async (req,res) => {
  try{

    const resultado = await sql`select * from produtos`;
    return res.status(200).json(resultado);

  }catch (error){

    console.error("erro ao buscar produtos", error);
    return res.status(500).json({ erro: "erro no servidor" });

  }
}); 


app.get("/contas", async (req,res) => {
  try{

    const contas_ = await sql`select * from contas`;
    return res.status(200).json(contas_);

  }catch (error){

    console.error("erro ao buscar produtos", error);
    return res.status(500).json({ erro: "erro no servidor" });

  }
}); 


app.post('/contas', async (req, res) => {
  try {
    let { nome, email, senha, foto_url } = req.body;
    if (!nome || !email || !senha) {
      return res.status(400).json({ erro: 'nome, email e senha são obrigatórios' });
    }
    nome = String(nome).trim();
    email = String(email).trim().toLowerCase();
    foto_url = foto_url ? String(foto_url).trim() : null;

    const rows = await sql`
      INSERT INTO contas (nome, email, senha, img_url)
      VALUES (${nome}, ${email}, ${senha}, ${foto_url})
      RETURNING id_usuario, nome, email, img_url AS foto_url
    `;

   
    if (!rows || rows.length === 0) {
      console.error('Inserção não retornou linhas:', rows);
      return res.status(500).json({ erro: 'erro ao inserir usuário' });
    }

    return res.status(201).json(rows[0]);
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


app.patch("/contas/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha } = req.body;

  try {
    const contaAtual = await sql`SELECT * FROM contas WHERE id_usuario = ${id}`;
    if (contaAtual.length === 0) {
      return res.status(404).json({ erro: "Conta não encontrada" });
    }

    const atual = contaAtual[0];


    const novoNome = nome ?? atual.nome;
    const novoEmail = email ?? atual.email;
    const novaSenha = senha ?? atual.senha;
    const novoCep = senha ?? atual.senha;
    const novoTelefone = senha ?? atual.senha;


    const atualizado = await sql`
      UPDATE contas
      SET nome = ${novoNome},
          email = ${novoEmail},
          senha = ${novaSenha},
          cep = ${novoCep},
          telefone = ${novoTelefone}
      WHERE id_usuario = ${id}
      RETURNING *;
    `;

    return res.status(200).json({
      sucesso: true,
      conta: atualizado[0]
    });

  } catch (error) {
    console.error("Erro ao atualizar conta:", error);
    return res.status(500).json({ erro: "Erro no servidor" });
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





app.listen(3000, () => {
  console.log("No ar!");
});