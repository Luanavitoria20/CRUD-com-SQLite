import express from 'express'
import {
    getAllProducts, createProduct, 
    updateProduct, deleteProduct, getProductId} from "../controllers/productController.js"

const router = express.Router()

router.get('/', getAllProducts); // obter/lista todos os produtos
router.post('/',createProduct); // criar produto
router.put('/:id',updateProduct) // atualizar
router.delete('/:id',deleteProduct) // remove
router.get('/:id', getProductId); // obter id do produto
export default router 