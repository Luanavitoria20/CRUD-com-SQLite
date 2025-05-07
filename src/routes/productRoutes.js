import express from 'express'
import {getAllProducts, createProduct, updateProduct, deleteProduct} from "../controllers/productController.js"

const router = express.Router()

router.get('/', getAllProducts); // obter/lista todos os produtos
router.post('/',createProduct); // criar produto
router.put('/:id',updateProduct) // atualizar
router.delete('/:id',deleteProduct)
export default router