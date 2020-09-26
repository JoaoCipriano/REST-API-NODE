const express = require('express');
const router = express.Router();

// RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Retorna todos os produtos.'
    });
});

// INSERE UM PRODUTO
router.post('/', (req, res, next) => {
    res.status(201).send({
        mensagem: 'O produto foi criado.'
    });
});

// RETORNO UM PRODUTO ESPECÍFICO
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto
        res.status(200).send({
            mensagem: 'Detalhes do produto',
            id_produto: id
        });
    
});

// ATUALIZA UM PRODUTO ESPECÍFICO
router.patch('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto

    res.status(200).send({
        mensagem: 'O produto ' + id + ' foi modificado.',
        id_produto: id
    });
});

// DELETA UM PRODUTO ESPECÍFICO
router.delete('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto

    res.status(200).send({
        mensagem: 'O produto ' + id + ' foi deletado.',
        id_produto: id
    });
});

module.exports = router;