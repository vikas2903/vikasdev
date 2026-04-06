import mongoose from "mongoose";

const rateingSchema = new mongoose.Schema({
    rate: { type: Number, required: true },
    count: { type: Number, required: true }
})

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: rateingSchema, required: true }
})

export default mongoose.models.Product || mongoose.model("Product", productSchema);
