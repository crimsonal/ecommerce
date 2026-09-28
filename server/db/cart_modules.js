import { pool } from "../scripts/connection";

export async function getUserCart(userId) {
    try {
        const [rows] = await pool.query(`SELECT * FROM carts`)
    } catch (err) {
        return {success: false, error: err}
    }

    return {success: false, message: "Something went wrong"}
    
}

export async function inCart(userId, cartId, productId) {
    try {
        const [rows] = await pool.query(`SELECT * FROM cart_items c WHERE c.cart_id = ? AND c.product_id = ?`,[cartId, productId])

        if (rows.length !== 0) {
            return {success: true}
        }
    } catch (err) {
        return {success: false, error: err}
    }

    return {success: false, message: `Product #${productId} is not in cart`}
}

