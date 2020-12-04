const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const ProdutoController = require('../controllers/produtosController');

router.get('/', login.obrigatorio, ProdutoController.getProdutos);
router.post('/', login.obrigatorio, ProdutoController.postProdutos);
router.get('/:id_produto', ProdutoController.getProdutoId);
router.patch('/', login.obrigatorio, ProdutoController.patchProduto);
router.delete('/', login.obrigatorio, ProdutoController.deleteProduto);

module.exports = router;