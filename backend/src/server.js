import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = 5000;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('<h1 style="color:green; font-family:sans-serif;">API Backend en ligne (Port 5000)</h1>');
});

app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Le serveur fonctionne parfaitement' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});