const express = require('express');
const router = express.Router();
const login = require('../middleware/login');

const supermercadoController = require('../controllers/supermercadoController');

router.get('/', login.obrigatorio, supermercadoController.getSupermercado);
router.post('/', login.obrigatorio, supermercadoController.postSupermercado);
router.get('/:id_supermercado', login.obrigatorio, supermercadoController.getSupermercadoId);
router.patch('/', login.obrigatorio, supermercadoController.patchSupermercado);
router.delete('/', login.obrigatorio, supermercadoController.deleteSupermercado);

module.exports = router;