import jwt from "jsonwebtoken";

export default function check(req, res, next) {

    // if (req.method === "GET") { // retrieving data should not require authentication.
    //     next()
    // }
    console.log("check")
    const authHeader = req.headers["authorization"]

    if (!authHeader) {
        return res.status(401).send( {success: false, message: "Authorization header required"} )
    }

    const [type, token] = authHeader.split(" ")

    if (type !== "Bearer") {
        return res.status(401).send( {success: false, message: "Invalid auhtorization format"} )
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET) 
        console.log(decoded)
        req.user = decoded 
        next()
    } catch (err) {
        res.status(401).send( {success: false, message: "Invalid or expired token", error: err} )
    }
}