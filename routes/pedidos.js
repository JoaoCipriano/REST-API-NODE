const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// RETORNA TODOS OS PEDIDOS
router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `SELECT pedidos.id_pedido, 
                    pedidos.quantidade, 
                    produtos.id_produto, 
                    produtos.preco 
               FROM pedidos 
         INNER JOIN produtos 
                 ON produtos.id_produto = pedidos.id_produto`,
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    pedidos: result.map(ped => {
                        return {
                            id_pedido: ped.id_pedido,
                            quantidade: ped.quantidade,
                            produto: {
                                id_produto: ped.id_produto,
                                preco: ped.preco
                            },                            
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna os detalhes de um pedido específico',
                                url: 'http://localhost:3000/pedidos/' + ped.id_pedido
                            }
                        }
                    })
                }
                return res.status(200).send(response);
            }  
        )
    });
});

// INSERE UM PEDIDO
router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query('SELECT * FROM produtos WHERE id_produto = ?', [req.body.id_produto], (error, result, field) => {
            if (result.length == 0) {
                return res.status(404).send({
                    mensagem: 'Não foi encontrado um produto com o ID ' + req.body.id_produto
                });
            }
            if (error) { return res.status(500).send({ error: error }) }            
            conn.query(
                'INSERT INTO pedidos (id_produto, quantidade) VALUES (?, ?)',
                [req.body.id_produto, req.body.quantidade],
                (error, result, field) => {
                    conn.release();
                    if (error) { return res.status(500).send({ error: error }) }
                    const response = {
                        mensagem: 'Pedido inserido com sucesso',
                        pedidoCriado: {
                            id_pedido: result.id_pedido,
                            id_produto: req.body.id_produto,
                            quantidade: req.body.quantidade,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna todos os pedidos',
                                url: 'http://localhost:3000/pedidos'
                            }
                        }
                    }
                    return res.status(201).send(response);
                }
            )  

        });
    });  
});

// RETORNO UM PEDIDO ESPECÍFICO
router.get('/:id_pedido', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            'SELECT * FROM pedidos WHERE id_pedido = ?',
            [req.params.id_pedido],
            (error, result, fields) => {
                if (error) { return res.status(500).send({ error: error }) }
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: 'Não foi encontrado um pedido com o ID ' + req.params.id_pedido
                    });
                }
                const response = {
                    pedido: {
                        id_pedido: result[0].id_pedido,
                        id_produto: result[0].id_produto,
                        quantidade: result[0].quantidade,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os pedidos',
                            url: 'http://localhost:3000/pedidos'
                        }
                    }
                }
                return res.status(200).send(response);
            }  
        )
    }); 
});

// ATUALIZA UM PEDIDO ESPECÍFICO
router.patch('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido

    res.status(200).send({
        mensagem: 'O PEDIDO ' + id + ' foi modificado.',
        id_pedido: id
    });
});

// DELETA UM PEDIDO ESPECÍFICO
router.delete('/:id_pedido', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) }
        conn.query(
            `DELETE FROM pedidos WHERE id_pedido = ?`, [req.body.id_pedido],
            (error, result, field) => {
                conn.release();
                if (error) { return res.status(500).send({ error: error }) }
                const response = {
                    mensagem: 'Pedido removido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um pedido',
                        url: 'http://localhost:3000/pedidos',
                        body: {
                            id_produto: 'Number',
                            quantidade: 'Number'
                        }
                    } 
                }
                return res.status(202).send(response);
            }
        )      
    }); 
});

module.exports = router;