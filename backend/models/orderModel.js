import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    items: {type: Array, required: true},
    status: {type: String, required: true, default: 'pending'},
    userInfo: {type: Object, required: true},
    projectInfo: {type: Object, required: true},
    date: {type: Number, required: true},
    
})

const orderModel = mongoose.model.order || mongoose.model('order', orderSchema)
export default orderModel;