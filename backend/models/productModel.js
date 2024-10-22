import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    quantity: { type: Number, required: true },
    availability: { type: Boolean, default: false },
    date: { type: Number, required: true },
});

// Pre-save middleware to update availability based on quantity
productSchema.pre('save', function (next) {
    // If the quantity is 0, set availability to false, otherwise true
    if (this.quantity === 0) {
        this.availability = false;
    } else {
        this.availability = true;
    }
    next();
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;






