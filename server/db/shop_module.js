import { pool } from "../scripts/connection.js"

export async function addProductToShop(product_id, user_id, price) {

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

export async function getShop() {

    try {
        const [rows] = await pool.query("SELECT * FROM shop", [])

        return {success: true, shop: rows}
    } catch (err) {
        return {success: false, error: err}
    }
    
    return {success: false}
}