import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    quantity: { type: String, required: true },
    availability: { type: Boolean, default: false },
    sizes: {type: Array, required: true},
    date: { type: Number, required: true },
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);

export default productModel;