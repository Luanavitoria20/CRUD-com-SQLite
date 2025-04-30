import express from 'express'
import {createUser, getAllUsers, deleteUser, updateUser} from "../controllers/userController.js"
//import {Newuser}from "../controllers/userController.js"


const router = express.Router()

router.get('/',getAllUsers)
//router.post('/',Newuser)
router.post('/',createUser)
router.delete('/:id',deleteUser)
router.put('/:id',updateUser)
export default router
