import { pool } from "../scripts/connection.js"

// Sends query to DB to ensure that user exists
export async function doesUserExist(id) {
    
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id])

    if (rows.length === 0) {
        return false
    }

    return true
}

export async function getUser(id) {


    try {
        const [rows] = await pool.query("SELECT id, email, username FROM users WHERE id = ?", [id])

        if (rows.length !== 0) {
            return rows[0]
        }

        return {success: false, message: "User does not exist"}

    } catch (err) {
        return {success: false, error: err}
    }
    
    return {success: false, message: "Something went wrong"}

}
