import express from 'express';
import cors from 'cors';
import db from './db.js';
import bcrypt from 'bcrypt';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API do Gerenciador de Finanças rodando!'});
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const userResult = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userResult.rows.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    const user = userResult.rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Credenciais inválidas.' });
    }

    delete user.password;
    res.status(200).json({ message: 'Login bem-sucedido!', user });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
    
});

app.listen(PORT, () => {
    console.log(`Servidor na porta ${PORT}`);
});