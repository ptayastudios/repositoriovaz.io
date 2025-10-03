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

app.listen(3000, () => {
  console.log("No ar!");
});