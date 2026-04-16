import express from 'express';
import authRoutes from './routes/auth.js';
const app = express();
const PORT = 3000 || process.env.PORT;

app.get('/', (req, res) => {
  res.send('E-Commerce API is running');
});

app.use(express.json());
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});