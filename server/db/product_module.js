import { pool } from "../scripts/connection.js"


export async function addProduct (userId, {product_name, product_description, product_image}) {
    
    try {
        await pool.query("INSERT INTO products(product_name, product_description, product_image, user_id) VALUES (?, ?, ?, ?)", [product_name, product_description, product_image, userId])

    } catch (err) {
        return {success: false, error: err}
    }

    return {success: true}
}

export async function userOwnsProduct(userId, productId) {

    try { 
        const [rows] = await pool.query("SELECT * FROM products WHERE products.user_id = ? AND products.id = ?", [userId, productId])

        if (rows.length !== 0) {
            return {success: true}
        }
    } catch (err) {
        return {success: false, error: err}
    }

    return {success: false, message: "User does not own product"}
}

export async function removeProduct(productId) {

    try {

        await pool.query("DELETE FROM products WHERE products.id = ? ", [productId])

        return {success: true}

    } catch (err) {
        return {success: false, error: err}
    }

    return {success: false, message: "Failed to remove product"}
}

export async function getProduct(productId) {
    try {

        const [rows] = await pool.query("SELECT * FROM products WHERE products.id = ?", [productId])

        if (rows.length === 0) {
            return {success: false}
        }
        return {...rows[0], success: true}
    } catch (err) {
        return {success: false, message: err.message}
    }

    return {success: false, message: "Failed to find product"}
}

export async function getProducts(userId) {
    try {
        
        const [rows] = await pool.query(`
        SELECT
            p.*,
            s.price,
            EXISTS (
                SELECT 1
                FROM shop AS shop_check
                WHERE shop_check.product_id = p.id
            ) AS onSale
        FROM products p
        LEFT JOIN shop AS s ON p.id = s.product_id
        WHERE p.user_id = ?;`, [userId])

        if (rows.length === 0) {
            return {success: false}
        }
        return rows
    } catch (err) {
        return {success: false, message: err.message}
    }

    return {success: false, message: `Failed to find products for user id ${userId}`}
}