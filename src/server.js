const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API do Gerenciador de Finanças rodando!'});
});

app.listen(PORT, () => {
    console.log(`Servidor na porta ${PORT}`);
});