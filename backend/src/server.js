import express from 'express';
import cors from 'cors'; 
import { PlantRoute } from './routes/PlantRoute.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
    res.send("API do App Plant rodando com sucesso!");
});

app.use('/api/plantas', PlantRoute);

app.listen(PORT, () => {
    console.log(`Servidor rodando com sucesso em: http://localhost:${PORT}`);
});
