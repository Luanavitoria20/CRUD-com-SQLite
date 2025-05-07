import express from 'express'
import {createUser, 
    getAllUsers, 
    deleteUser, 
    updateUser,
    getUserId,
    registerUser} from "../controllers/userController.js"
import {validate} from "../middleware/validate.js"
import {createUserSchema, updateUserSchema} from "../schemas/userSchemas.js"

const router = express.Router()

router.get('/',getAllUsers)
router.post('/', validate(createUserSchema), createUser)
router.delete('/:id',deleteUser)
router.put('/:id',validate(updateUserSchema), updateUser)
router.get('/:id', getUserId)
router.post('/register', registerUser)
export default router
