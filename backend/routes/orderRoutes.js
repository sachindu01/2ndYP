import express from 'express'
import { placeOrder, allOrders, userOrders, updateStatus,getOrderDetails } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'


const orderRouter = express.Router()

//Admin features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

// Order place features
orderRouter.post('/place',authUser,placeOrder)

// User features
orderRouter.post('/userorders',authUser,userOrders)

// Order details feature
orderRouter.get('/details/:orderId', authUser, getOrderDetails);



export default orderRouter