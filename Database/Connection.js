import mysql from "mysql2/promise"
import env from "../Config/env.js"

const pool = mysql.createPool(env.db);

console.log("Pool MySQL criado.");

export default pool;