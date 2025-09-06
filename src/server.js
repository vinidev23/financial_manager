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

app.post('/api/users', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const checkUser = await db.query("SELECT * FROM users WHERE email = $1", [`${email}`]);
        if (checkUser.rows.length > 0) {
            return res.status(409).json({ message: 'E-mail já Cadastrado.' });
        }

        const result = await db.query(
            'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
            [name, email, password]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error("Erro ao registrar usuário", error);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
});