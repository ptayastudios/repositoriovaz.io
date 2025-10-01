const express = require("express");
const { pool } = require("./db");

const TABLE_NAME = "produtos"; 

const app = express();
app.use(express.json());

// Rota básica de vida
app.get("/", (_req, res) => res.send("API ON"));

// Saúde do DB (teste de conexão)
app.get("/health/db", async (_req, res) => {
  try {
    const r = await pool.query("SELECT NOW() as now");
    res.json({ ok: true, now: r.rows[0].now });
  } catch (e) {
    console.error("DB ERROR:", e.message);
    res.status(500).json({ ok: false, error: e.message });
  }
});

// LISTA
app.get("/produtos", async (_req, res) => {
  try {
    const sql = `
      SELECT
        id_produto AS id,
        nome,
        descricao,
        preco::float8 AS preco,
        img AS "imageUrl"
      FROM ${TABLE_NAME}
      ORDER BY id_produto ASC;
    `;
    const { rows } = await pool.query(sql);
    res.json(rows);
  } catch (err) {
    console.error("LIST ERROR:", err.message);
    res.status(500).json({ error: "erro na listagem de produtos" });
  }
});

// DETALHE POR ID
app.get("/produtos/:id", async (req, res) => {
  try {
    const sql = `
      SELECT
        id_produto AS id,
        nome,
        descricao,
        preco::float8 AS preco,
        img AS "imageUrl"
      FROM ${TABLE_NAME}
      WHERE id_produto = $1
      LIMIT 1;
    `;
    const { rows } = await pool.query(sql, [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: "produto nao encontrado" });
    res.json(rows[0]);
  } catch (err) {
    console.error("DETAIL ERROR:", err.message);
    res.status(500).json({ error: "erro ao buscar produto" });
  }
});

const PORT = 3000; // <- Express em 3000
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
