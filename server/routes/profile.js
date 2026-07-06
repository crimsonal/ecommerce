import e from "express"
import {getUser, doesUserExist} from "../db/user_module.js"
import { pool } from "../scripts/connection.js"
import { getProducts } from "../db/product_module.js"
const router = e.Router() 

router.get("/me", async(req, res) => {

    try {
        if (!doesUserExist(req.user.userId)) {
            return res.status(404).send({success: false, message: "User not found"})
        }

        const query = await getUser(req.user.userId)
        res.send( {...query, success: true})
    } catch (err) {
        res.status(500).send({success:false, message: "Error retrieving profile", error: err.message})
    }
})

router.get("/products", async (req, res) => {

    try { 
        const query = await getProducts(req.user.userId)
        res.send({products: query})
    } catch (err) {
        res.status(500).send({success: false, message: `Failed to retrieve products for user #${req.user.userId} `, error: err.message})
    }
    
})

export default router