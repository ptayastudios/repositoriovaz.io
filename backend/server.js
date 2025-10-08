import express from "express";
import cors from "cors";
import { pool } from "./db.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/produtos", async (req,res) => {
  try{

    const resultado = await pool.query("select * from produtos");
    return res.status(200).json(resultado.rows);

  }catch (error){

    console.error("erro ao buscar produtos", error);
    return res.status(500).json({ erro: "erro no servidor" });

  }
}); 

app.get("/contas", async (req,res) => {
  try{

    const contas_ = await pool.query("select * from contas");
    return res.status(200).json(contas_.rows);

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

    const sql = `
      INSERT INTO contas (nome, email, senha, img_url)
      VALUES ($1, $2, $3, $4)
      RETURNING id_usuario, nome, email, img_url
    `;
    const { rows } = await pool.query(sql, [nome, email, senha, foto_url]);
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
    const resultado = await pool.query("SELECT * FROM contas WHERE id_usuario = $1", [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: "Conta não encontrada" });
    }
    res.json(resultado.rows[0]);
  } catch (error) {
    console.error("Erro ao buscar conta:", error);
    res.status(500).json({ erro: "Erro no servidor" });
  }
});

// app.get("/produtos/:id", async (req, res) => {
//   const { id } = req.params;

//   try{
//     const resultado = await pool.query("SELECT * FROM produtos WHERE id_usuario = $1", [id]);
//     if(resultado.rows.length === 0){ return res.status(404).json({ erro: "produto nao encontrado" }); }
//   }catch(error){
//     console.error("erro ao buscar produto", erro);
//     res.status(500).json({ erro: "erro no servidor" });
//   }
// });


app.listen(3000, () => {
  console.log("No ar!");
});