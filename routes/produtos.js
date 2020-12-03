const express = require('express');
const router = express.Router();
const multer = require('multer');
const login = require('../middleware/login');

const ProdutoController = require('../controllers/produtosController');

const storage = multer.diskStorage({
   destination: function (req, file, cb) {
       cb(null, './uploads/');
   },
   filename: function (req, file, cb) {
    cb(null, new Date().toISOString()
        .replace('-', '')
        .replace('-', '')
        .replace('T', '')
        .replace(':', '')
        .replace(':', '')
        .replace('.', '')
        .replace('Z', '')  
        + file.originalname);
   }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);    
    } else {
        cb(null, false);
    }
}

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
 });

router.get('/', login.obrigatorio, ProdutoController.getProdutos);
router.post(
    '/', 
    login.obrigatorio, 
    upload.single('produto_imagem'), 
    ProdutoController.postProdutos
);
router.get('/:id_produto', ProdutoController.getProdutoId);
router.patch('/', login.obrigatorio, ProdutoController.patchProduto);
router.delete('/', login.obrigatorio, ProdutoController.deleteProduto);

module.exports = router;