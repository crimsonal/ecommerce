import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from "node:path"

const __dirname = import.meta.dirname
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const pool = mysql.createPool(process.env.MYSQLHOST)


