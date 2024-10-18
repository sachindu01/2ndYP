import express from 'express'
import { placeOrder, allOrders, userOrders, updateStatus,getOrderDetails } from '../controllers/inventoryReqController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'


const inventoryReqRouter = express.Router()

//Admin features
inventoryReqRouter.post('/list',adminAuth,allOrders)
inventoryReqRouter.post('/status',adminAuth,updateStatus)

// Order place features
inventoryReqRouter.post('/place',authUser,placeOrder)

// User features
inventoryReqRouter.post('/userorders',authUser,userOrders)

// Order details feature
inventoryReqRouter.get('/details/:orderId', authUser, getOrderDetails);



export default inventoryReqRouter