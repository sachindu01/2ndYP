import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// Placing orders 
const placeOrder = async (req, res) => {
    
    try {
        const {userId,items,userInfo,projectInfo}=req.body;

        const orderData = {
            userId,
            items,
            userInfo,
            projectInfo,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, {cartData: {}})

        res.json({success: true, message: 'Request sent successfully'})



    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
        
    }


}


// All orders data for admin panel
const allOrders = async (req, res) => {
    try {

        const orders = await orderModel.find({})
        res.json({success: true, orders})
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
        
    }
    
    


}

// User order data for frontEnd
const userOrders = async (req, res) => {

    try {
        const {userId} = req.body;
        const orders = await orderModel.find({userId})
        res.json({success: true, orders})
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
        
    }

}

// Update order status from Admin panel
const updateStatus = async (req, res) => {
    try {
        
        const {orderId, status} = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success: true, message: 'Status updated successfully'})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
        
    }


}

const getOrderDetails = async (req, res) => {
    const { orderId } = req.params; // Get orderId from request parameters

    try {
        const order = await orderModel.findById(orderId).populate('items._id'); // Populate item details if needed

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.json({ success: true, order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { placeOrder, allOrders, userOrders, updateStatus,getOrderDetails }