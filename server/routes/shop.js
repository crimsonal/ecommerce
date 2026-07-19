import e from "express";
import { userOwnsProduct, updateProduct } from "../db/product_module.js";
import {addProductToShop, getShop, productExists, removeProductFromShop, updatePrice} from "../db/shop_module.js"
const router = e.Router()

router.post("/", async(req, res) => {

    try {

        const {product_id, price} = req.body 

        if (!product_id || !price) {
            return res.status(400).send({success: false, message: "product_id and price is required"})
        }

        // ensure user owns the product to be added to shop

        const ownership = await userOwnsProduct(req.user.userId, Number(product_id))

        if (!ownership.success) {
            return res.status(400).send({...ownership, message: "User does not own product"})
        }

        const query = await addProductToShop(Number(product_id), req.user.userId, Number(price))
        if (!query.success) {
            return res.status(400).send({...query, message: "Failed to add product to shop"})
        }


        res.send({...query, message: "Added product to shop"})

    } catch (err) {
        res.status(500).send({success: false, message: "Error adding product to shop", error: err.message})
    }
})

router.post("/update", async(req, res) => {

    try {

        const {onSale, productId, productName, productDescription, productPrice} = req.body

        if (!productId || !onSale || !productName || !productDescription || !productPrice) {
            return res.status(400).send({success: false, message: "productId, onSale, productName, productDescription, and productPrice is required"})
        }

        const normalizedProductId = Number(productId)
        const normalizedPrice = Number(productPrice)
        const normalizedOnSale = Number(onSale)
        const userId = req.user.userId
        const ownership = await userOwnsProduct(userId, normalizedProductId)

        if (!ownership.success) {
            return res.status(400).send({...ownership, message: "User does not own product"})
        }
        
        updateProduct(normalizedProductId, productName, productDescription) 
        
        const exists = await productExists(normalizedProductId) 

        if (!exists.success) {
            if (normalizedOnSale === 0) {
                return res.status(200).send({message: "Successfully updated product attributes"})
            } else {
                const query = await addProductToShop(normalizedProductId, userId, normalizedPrice)
                if (!query.success) {
                    return res.status(400).send({...query, message: "Failed to add product to shop"})
                }

                return res.status(200).send({...query, message: "Added product to shop"})
            }
        } else {
            if (normalizedOnSale === 0) {
                await removeProductFromShop(userId, normalizedProductId)
                return res.status(200).send({message: "Successfully updated shop product and took product off shop"})
            } else {
                updatePrice(normalizedProductId, normalizedPrice)
                return res.status(200).send({message: "Successfully updated shop product"})
            }
        }
        
        res.status(200).send({message: "Something went wrong"})

    } catch (err) {
        res.status(500).send({success: false, message: "Error updating product", error: err.message})
    }
})

router.delete("/", async(req, res) => {

    try {

        const {product_id} = req.body

        if (!product_id) {
            return res.status(400).send({success: false, message: "product_id is required"})
        }

        const ownership = await userOwnsProduct(req.user.userId, Number(product_id))

        if (!ownership.success) {
            return res.status(400).send({...ownership, message: "User does not own product"})
        }

        const query = await removeProductFromShop(req.user.userId, Number(product_id))
        if (!query.success) {
            return res.status(400).send({...query, message: "Failed to remove product from shop"})
        }

        res.status(200).send({...query, message: "Deleted product from shop"})

     } catch (err) {
        res.status(500).send({success: false, message: "Error removing product from shop", error: err.message})
     }
})

router.get("/", async(req, res) => {
    try {
        const query = await getShop()

        res.send ({...query, message: "Success"})
    } catch (err) {
        res.status(500).send( {success: false, message: "Failed to retrieve shop items", error: err.message})
    }
})

export default router