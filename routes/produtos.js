const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {    
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
          'SELECT * FROM produtos;',
          (error, result, fields) => {
            if (error) { return res.status(500).send({ error: error }) }
            return res.status(200).send({ response: result })
          }  
        )
    });
});

// INSERE UM PRODUTO
router.post('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?, ?);',
            [req.body.nome, req.body.preco],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }

                res.status(201).send({
                    mensagem: 'Produto inserido com sucesso.',
                    id_produto: result.insertId
                });
            }
        )      
    });   
});

// RETORNA UM PRODUTO ESPECÍFICO
router.get('/:id_produto', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
          'SELECT * FROM produtos WHERE id_produto = ?',
          [req.params.id_produto],
          (error, result, fields) => {
            if (error) { return res.status(500).send({ error: error }) }
            return res.status(200).send({ response: result })
          }  
        )
    });  
});

// ATUALIZA UM PRODUTO ESPECÍFICO
router.patch('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `UPDATE produtos
                SET nome       = ?, 
                    preco      = ?
              WHERE id_produto = ?`,
            [
                req.body.nome, 
                req.body.preco, 
                req.body.id_produto
            ],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Produto atualizado com sucesso.'
                });
            }
        )      
    });  
});

// DELETA UM PRODUTO ESPECÍFICO
router.delete('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM produtos WHERE id_produto = ?`, [req.body.id_produto],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }

                res.status(202).send({
                    mensagem: 'Produto removido com sucesso.'
                });
            }
        )      
    }); 
});

module.exports = router;