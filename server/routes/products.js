import e from "express"
import { pool } from "../scripts/connection.js"
import {doesUserExist} from "../db/user_module.js"
import { addProduct, removeProduct, userOwnsProduct, getProduct } from "../db/product_module.js"
const router = e.Router()

router.post("/", async (req, res) => {
    try {
        const {product_name, product_descåription, product_image} = req.body 
        if (!product_name || !product_description || !product_image) {
            return res.status(400).send({success: false, message: "product_name, product_description, and product_image required"})
        }

        // locate user in database

        if (doesUserExist(req.user.userId)) {
            const query = await addProduct(req.user.userId, {product_name, product_description, product_image})
            if (!query.success) {
                return res.status(404).send({...query, message: "Failed to add product"})
            }
        }


        res.send({success: true, message: "Product added successfully"})
    } catch (err) {
        res.status(500).send({success:false, message: "Error adding product", error: err.message})
    }
})

router.get("/:id", async(req, res) => {

    try {
        const id = req.params.id 

        if (!id) {
            return res.status(400).send({success: false, message: "id is required"})
        }

        const query = await getProduct(id)

        if (!query.success) {
            return res.status(404).send({...query, message: "Product not found"})
        }
        
        res.send(query)


    } catch (err) {
        res.status(500).send({success: false, message: "Something went wrong", error: err.message})
    }
})

router.delete("/", async (req, res) => { // TODO: path parameter for id

    try {
        const {product_id} = req.body

        if (!product_id) {
            return res.status(400).send({success: false, message: "product_id is required"})
        }

        const query = await userOwnsProduct(req.user.userId, Number(product_id))

        if (!query.success) {
            return res.status(401).send({...query})
        }

        const query2 = await removeProduct(Number(product_id))

        if (!query2.success) {
            return res.status(404).send({...query2})
        }

        res.send({...query2, message: "Successfully removed product from user"})


    } catch (err) {
        res.status("500").send({success: false, message: "Failed to delete product", err: err.message})
    }
})

export default router