import e from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {pool} from "../scripts/connection.js";

const router = e.Router() 
const salt = await bcrypt.genSalt(10);
const SALT_ROUNDS = 12;
const encryptPassword = (password) => { 
  return bcrypt.hash(password, salt);
}

const generateToken = (userId, email) => {
  return jwt.sign({ userId, email }, process.env.JWT_SECRET, { expiresIn: '12h' });
};

router.post('/register', async (req, res) => {
  
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.send({ success: false, message: 'Email and password is required' });
    }

    // check if user doesn't already exist in the database
    
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email])

    if (rows.length !== 0) {
      return res.status(409).send( {success: false, message: "User already registered"} )
    } 

    const password_hash = await encryptPassword(password);

    await pool.query("INSERT INTO users (email, password_hash) VALUES (?, ?)", [email, password_hash])
    res.send({ success: true, message: 'User registered successfully' });
  } catch (err) {
    res.status(500).send({ success: false, message: 'Error registering user', error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {

    const {email, password} = req.body 

    if (!email || !password) {
      return res.send({ success: false, message: 'Email and password is required' });
    }

    // check if user exists

    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email])

    if (rows.length === 0) {
      return res.status(404).send( {success: false, message: "User does not exist"} )
    } 

    
    const c = await bcrypt.compare(password, rows[0].password_hash)
    if ( !c ){
      return res.status(401).send({ success:false, message: "Incorrect password" })
    }

    const token = generateToken(rows[0].id, rows[0].email)

    res.send({ success: true, token: token, message: "Successfully signed in" })

  } catch (err) {
    res.status(500).send({ success: false, message: "Error logging in", error: err.message })
  }
}); 

router.post('/logout', (req, res) => {
  res.send('User logout endpoint');
}); 

export default router