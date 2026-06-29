import e from "express"
import { pool } from "../scripts/connection.js"
import {doesUserExist} from "../db/user_module.js"
import {S3Client, PutObjectCommand, GetObjectCommand} from "@aws-sdk/client-s3"
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { addProduct, removeProduct, userOwnsProduct, getProduct } from "../db/product_module.js"
import dotenv from 'dotenv';
import path from "node:path"

const __dirname = import.meta.dirname
const router = e.Router()

dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const s3 = new S3Client({
    region: 'us-east-1',
    endpoint: process.env.BUCKET_ENDPOINT,
    credentials: {
        accessKeyId: process.env.BUCKET_ACCESS_KEY_ID,
        secretAccessKey: process.env.BUCKET_SECRET_ACCESS_KEY
    }
})

router.post("/", async (req, res) => {
    try {
        const {product_name, product_description, product_image} = req.body 
        if (!product_name || !product_description || !product_image) {
            return res.status(400).send({success: false, message: "product_name, product_description, and product_image required"})
        }


        const query = await addProduct(req.user.userId, {product_name, product_description, product_image})
        if (!query.success) {
            return res.status(404).send({...query, message: "Failed to add product"})
        }


        res.send({success: true, message: "Product added successfully"})
    } catch (err) {
        console.log(err.message)
        res.status(500).send({success:false, message: "Error adding product", error: err.message})
    }
})

router.get("/get", async(req, res) => {
    
    try {
        const {id} = req.query

        if (!id) {
            return res.status(400).send({success: false, message: "id is required"})
        }

        const query = await getProduct(id)
        console.log(query)
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
        res.status(500).send({success: false, message: "Failed to delete product", err: err.message})
    }
})

router.post("/upload-url", async(req, res) => {


    try{
        const {file_name} = req.body 
        if (!file_name) {
            return res.status(400).send({success: false, message: "file_name is required"})
        }
        
        const key = `user-uploads/${req.user.userId}/${file_name}`

        const command = new PutObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: key
        })

        const Url = await getSignedUrl(s3, command, {expiresIn: 3600})
        res.status(200).send({url: Url})
    } catch (err) {
        console.log(err.message)
        res.status(500).send({success: false, message: "Failed: /prepareImageUpload", err: err.message})
    }
    
})

router.get("/url", async (req, res) => {
    const {key} = req.query 

    if (!key) {
        return res.status(400).send({success: false, message: "key is required"})
    }

    try {
        const command = new GetObjectCommand({
            Bucket: process.env.BUCKET_NAME,
            Key: key
        })

        const Url = await getSignedUrl(s3, command, {
            expiresIn: 60 * 5 
        })

        res.status(200).send({url: Url})
    } catch (err) {
        res.status(500).send({success: false, message: "Failed: /url", err: err.message})
    }

})

export default router