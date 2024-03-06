const express = require('express');
const mysql = require('mysql');

const app = express();
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sorveteria",
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados MySQL');
});

app.get('/pedidos/view', (req, res) => {
    console.log('Estou aqui');
    const query = 'SELECT * FROM detalhes_pedidos';
    connection.query(query, (erro, resultados) => {
        if (erro) {
            console.error('Erro ao consultar pedidos:', erro);
            return res.status(500).json({ error: 'Erro interno do servidor' });
        }
        if (resultados.length === 0) {
            console.log('Nenhum pedido encontrado.');
            return res.status(404).json({ error: 'Nenhum pedido encontrado.' });
        }

        console.log('Resultados da consulta:', resultados);
        const pedidos = resultados.map(resultado => {
            return {
                resultados
            };
        });

        res.json({ pedidos });
    });
});


app.get('/pedidos/:id_pedido', (req, res) => {
    const idPedido  = req.params.id_pedido;
    console.log('estou aqui');
    const query = `SELECT * FROM Pedidos WHERE id_pedido = ?`;
    connection.query(query, [idPedido], (err, results) => {
        if (err) {
            console.error('Erro ao consultar pedidos:', err);
            res.status(500).json({ error: 'Erro interno do servidor' });
            return;
        }
        console.log('Resultados da consulta:', results);
        res.json({ 
            id_cliente: idPedido,
            pedidos: results
        });
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
