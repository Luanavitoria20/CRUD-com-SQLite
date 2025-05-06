import express from 'express'
import {createUser, getAllUsers, deleteUser, updateUser,getUserId} from "../controllers/userController.js"
import {validate} from "../middleware/validate.js"
import {createUserSchema} from "../schemas/userSchemas.js"

const router = express.Router()

router.get('/',getAllUsers)
router.post('/', validate(createUserSchema), createUser)
router.delete('/:id',deleteUser)
router.put('/:id',updateUser)
router.get('/:id', getUserId)
export default router
