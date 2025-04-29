import express from 'express'
import {getAllUsers} from "../controllers/userController.js"
import {Newuser}from "../controllers/userController.js"


const router = express.Router()

router.get('/',getAllUsers)
router.post('/',Newuser)

export default router
