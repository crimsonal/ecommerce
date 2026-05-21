import { pool } from "../scripts/connection.js"

export default async function addProductToShop(product_id, user_id, price) {

    try { 
        const [rows] = await pool.query("INSERT INTO shop(user_id, product_id, price) VALUES (?, ?, ?)", [user_id, product_id, price])
        
        if (rows.length !== 0) {
            return {success: true, shop_id: rows.insertId}
        }
        
    } catch (err) {
        return {success: false, error: err}
    }
    
    return {success: false}
}