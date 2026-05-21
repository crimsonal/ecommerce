import e from "express"
import middleware from "../middleware/auth.js"
import { pool } from "../scripts/connection.js"

const router = e.Router()

router.post("/", (req, res) => {

    try {
        const {product_name} = req.body 

        if (!product_name) {
            return res.status(400).send({success: false, message: "Product name required"})
        }

        res.send({success: true, message: "Product added successfully"})
    } catch (err) {
        res.status(500).send({success:false, message: "Error adding product", error: err.message})
    }
})

export default router