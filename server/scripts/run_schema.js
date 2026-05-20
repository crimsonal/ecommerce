import mysql from "mysql2/promise"
import fs from "fs"
import path from "node:path"
import dotenv from 'dotenv';
const __dirname = import.meta.dirname
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

async function uploadSchema() {

    const connection = mysql.createConnection(
        {
            uri: process.env.MYSQLHOST,
            multipleStatements: true
        
        })

    try {
        const sqlPath = path.join(__dirname, "../db/schema.sql")
        const sql = fs.readFileSync(sqlPath, "utf8")
        console.log(sql)
        console.log("Uploading schema");
        (await connection).query(sql)
        console.log("Database schema successfully uploaded")
    } catch (err) {
        console.error("Error uploading schema: " + err)
    } finally {
        (await connection).end()
    }

    
}


uploadSchema()