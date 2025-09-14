import pg from 'pg';
import 'dotenv/config';

const { Pool } = pg;

const pool = new Pool ({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Erro na conexão com o banco de dados:', err.stack);
    }
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    release();
    });

export default pool;