import mongoose from 'mongoose';
const viaGoogleUserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    googleId: { type: String, unique: true, sparse: true },
    password: { type: String },
    phonenumber: { type: String },
    privacy: { type: Boolean, default: false },
    profilePicture: { type: String }
}, { timestamps: true })    

viaGoogleUserSchema.index({ googleId: 1 }, { unique: true, sparse: true });

export default mongoose.models.ViaGoogleUser || mongoose.model("ViaGoogleUser", viaGoogleUserSchema);
