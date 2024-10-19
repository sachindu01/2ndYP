import mongoose from "mongoose";

const inventoryReqSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    items: {type: Array, required: true},
    status: {type: String, required: true, default: 'pending'},
    
    userInfo: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }
    },

    projectInfo: {
        projectName: { type: String, required: true },
        projectDescription: { type: String, required: true },
        projectTimeline: { type: String, required: true },
    },

    date: {type: Number, required: true},
    
})

const inventoryReqModel = mongoose.model.inventoryReq || mongoose.model('inventoryReq', inventoryReqSchema)
export default inventoryReqModel;