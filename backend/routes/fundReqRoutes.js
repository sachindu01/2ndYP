import express from 'express'
import { placeFundReq, allFundReq, userFundReq , updateStatus } from '../controllers/fundReqController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'
import upload from '../middleware/multer.js'

const fundReqRouter = express.Router()

//Admin features
fundReqRouter.post('/list',adminAuth,allFundReq)
fundReqRouter.post('/status',adminAuth,updateStatus)

// Fund request place features
fundReqRouter.post('/place',upload.single('budgetDetails'),authUser,placeFundReq)

// User features
fundReqRouter.post('/userreq',authUser,userFundReq)

export default fundReqRouter