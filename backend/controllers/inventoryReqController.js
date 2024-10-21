import inventoryReqModel from "../models/inventoryReqModel.js";
import userModel from "../models/userModel.js";
import crypto from 'crypto-js';
import productModel from "../models/productModel.js";

// Placing orders 
const placeOrder = async (req, res) => {
    
    try {
        const {userId,items,userInfo,projectInfo}=req.body;

        // Generate a hash for verification key (based on userId and date)
        const rawString = userId + Date.now().toString();
        const hash = crypto.SHA256(rawString).toString(); // Generate SHA256 hash
        const verificationKey = hash.substring(0, 10).toUpperCase();

        const orderData = {
            userId,
            items,
    
            userInfo: {
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                email: userInfo.email,
                phone: userInfo.phone,
            },

            projectInfo: {
                projectName: projectInfo.projectName,
                projectDescription: projectInfo.projectDescription,
                projectTimeline: projectInfo.projectTimeline,
            },
            verificationKey,
            date: Date.now()
        }

        const newOrder = new inventoryReqModel(orderData)
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

        const orders = await inventoryReqModel.find({})
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
        const orders = await inventoryReqModel.find({userId})
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
        await inventoryReqModel.findByIdAndUpdate(orderId, {status})
        res.json({success: true, message: 'Status updated successfully'})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
        
    }


}

const getOrderDetails = async (req, res) => {
    const { orderId } = req.params; // Get orderId from request parameters

    try {
        const order = await inventoryReqModel.findById(orderId).populate('items._id'); // Populate item details if needed

        if (!order) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }

        res.json({ success: true, order });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Route for marking the request as issued
const markAsIssued = async (req, res) => {

    try {

        const { reqId } = req.body; 
        const issuedDate = new Date();

        const order = await inventoryReqModel.findByIdAndUpdate(reqId, { issuedDate });

        if (!order) {
            return res.json({ success: false, message: 'Inventory request not found' });
        }


        // Loop through the items in the request and update the inventory
        for (const item of order.items) {
        
        const product = await productModel.findById(item._id);

        if (!product) {
            return res.status(400).json({ success: false, message: `Product ${item.name} not found in inventory` });
        }

        // Check if the product has enough stock to fulfill the request
        if (product.quantity >= item.quantity) {
            product.quantity -= item.quantity; // Deduct the requested quantity from stock
            await product.save(); // Save the updated product

        } else {
            return res.status(400).json({ success: false, message: `Not enough stock for product ${item.name}` });
        }
         }

     return res.json({ success: true, message: 'Request marked as issued and stock updated' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Route for marking the request as returned
const markAsReturned = async (req, res) => {

    try {
        const { reqId } = req.body; 
        const returnedDate = new Date();

        const order = await inventoryReqModel.findByIdAndUpdate(reqId, { returnedDate });

        if (!order) {
            return res.json({ success: false, message: 'Inventory request not found' });
        }

         // Loop through the items in the request and update the inventory
         for (const item of order.items) {
        
            const product = await productModel.findById(item._id);
    
            if (!product) {
                return res.status(400).json({ success: false, message: `Product ${item.name} not found in inventory` });
            }

            product.quantity += item.quantity;
            await product.save();
            
        }

    return res.json({ success: true, message: 'stock updated' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { placeOrder, allOrders, userOrders, updateStatus, getOrderDetails, markAsIssued, markAsReturned }