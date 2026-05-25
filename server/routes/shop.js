import e from "express";
import { userOwnsProduct } from "../db/product_module.js";
import {addProductToShop, getShop} from "../db/shop_module.js"
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

router.get("/", async(req, res) => {
    try {
        const query = await getShop()

        res.send ({...query, message: "Success"})
    } catch (err) {
        res.status(500).send( {success: false, message: "Failed to retrieve shop items", error: err.message})
    }
})

export default router