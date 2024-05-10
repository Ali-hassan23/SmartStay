const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Rfvg@1503",
  host: "localhost",
  port: 5432,
  database: "SmartStay",
});

module.exports = pool;
