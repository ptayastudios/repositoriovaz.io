const { pool } = require("./db");
(async () => {
    const r = await pool.query("SELECT NOW() as now");
    console.log(r.rows[0]);
    await pool.end();
})();