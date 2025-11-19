import express, { Router } from 'express'
import { assignEventToAdmin, getAdminList } from '../controllers/adminAssignmentController.js'
import { authMiddleware } from '../middleware/auth.js'
import { authSuperAdminMiddleware } from '../middleware/authSuperAdmin.js'


const assignRouter = express.Router()

assignRouter.get('/admins',authMiddleware,authSuperAdminMiddleware,getAdminList)
assignRouter.post('/assign',authMiddleware,authSuperAdminMiddleware,assignEventToAdmin)

export default assignRouter