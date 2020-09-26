const express = require('express');
const router = express.Router();

// RETORNA TODOS OS PEDIDOS
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorna todos os pedidos.'
    });
});

// INSERE UM PEDIDO
router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'O pedido foi criado.'
    });
});

// RETORNO UM PEDIDO ESPECÍFICO
router.get('/:id_pedido', (req, res, next) => {
    const id = req.params.id_pedido    
        res.status(200).send({
            mensagem: 'Detalhes do pedido',
            id_pedido: id
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
    const id = req.params.id_pedido

    res.status(200).send({
        mensagem: 'O PEDIDO ' + id + ' foi deletado.',
        id_pedido: id
    });
});

module.exports = router;