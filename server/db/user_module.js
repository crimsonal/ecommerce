import { pool } from "../scripts/connection.js"

// Sends query to DB to ensure that user exists
export default async function doesUserExist(id) {
    
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id])

    if (rows.length === 0) {
        return false
    }

    return true
}
