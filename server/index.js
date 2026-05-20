import express from 'express';
import authRoutes from './routes/auth.js';
import {pool} from "./scripts/connection.js"
const app = express();
const PORT = process.env.PORT || 3000;

const shutdown = async () => {
  try {
    await pool.end()
  } catch (err) {
    console.log("Error when closing server: " + err)
  }
  console.log("\nHTTP server closed.")
  process.exit()
}
app.get('/', (req, res) => {
  res.send('E-Commerce API is running');
});

app.use(express.json());
app.use('/api/auth', authRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  try { 
    const connection = pool.getConnection()
    console.log("Pool connection established")
  } catch (err) {
    console.error("Failed to connect to the pool: ", err.message)
  }
});

process.on("SIGINT", shutdown)
process.on("SIGTERM", shutdown)
