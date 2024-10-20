import fundReqModel from "../models/fundReqModel.js";
import userModel from "../models/userModel.js";
import {v2 as cloudinary} from "cloudinary"

// Placing fund request
const placeFundReq = async (req, res) => {

    try {

        console.log(req.body); 
        console.log(req.file);

        // Extracting required data from request body
        const {
            userId,
            leader,
            teamMembers,
            contactInfo,
            projectInfo,
            supervisor,
        } = req.body;

        // Get the file path from Multer (this will be in req.file)
        const budgetDetails = req.file;

        // Upload the file to Cloudinary
        let budgetDetailsUrl = null;
        if (budgetDetails) {
            const result = await cloudinary.uploader.upload(budgetDetails.path, {
                resource_type: 'raw' // 'raw' for PDFs and other non-media files
            });
            budgetDetailsUrl = result.secure_url; // Get the secure URL
        }
        

        // Creating the fund request data
        const fundReqData = {
            userId,
            leader,
            teamMembers,
            contactInfo,
            projectInfo,
            supervisor,
            budgetDetails: budgetDetailsUrl,  
            date: Date.now(),  
            
        };

        // Creating a new fund request using the model
        const newFundReq = new fundReqModel(fundReqData);

        // Saving the fund request to the database
        await newFundReq.save();

        res.json({ success: true, message: 'Fund request submitted successfully' });


    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
        
    }


}


// All fundReq data for admin panel
const allFundReq = async (req, res) => {

    try {

        // Fetch all fund requests
        const fundRequests = await fundReqModel.find({});
        // Return success with the list of fund requests
        res.json({ success: true, fundRequests });
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
        
    }
    

}

// User fundReq data for frontEnd
const userFundReq = async (req, res) => {


    try {
        const {userId} = req.body;

        // Find fund requests for the given user
        const userFundRequests = await fundReqModel.find({ userId });

        res.json({ success: true, userFundRequests });
        
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
        
    }

}

// Update fundReq status from Admin panel
const updateStatus = async (req, res) => {

    try {
        
        const {reqId, status} = req.body
        await fundReqModel.findByIdAndUpdate(reqId, { status });
        res.json({success: true, message: 'Status updated successfully'})

    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
        
    }


}

// const getOrderDetails = async (req, res) => {
//     const { orderId } = req.params; // Get orderId from request parameters

//     try {
//         const order = await inventoryReqModel.findById(orderId).populate('items._id'); // Populate item details if needed

//         if (!order) {
//             return res.status(404).json({ success: false, message: 'Order not found' });
//         }

//         res.json({ success: true, order });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ success: false, message: error.message });
//     }
// };

export { placeFundReq, allFundReq, userFundReq , updateStatus }