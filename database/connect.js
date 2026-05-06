import mongoose from "mongoose";
import ViaGoogleUser from "../models/viagogoleusers.js";

const connectToDatabase = async () => {
    const uri = process.env.MONGO_URI || "mongodb+srv://vikasprasad2903:fkkbpuJg7iHm7dB4@cluster0.nq7t1.mongodb.net/meta_analytics";

    await mongoose.connect(uri)
        .then(async () => {
            console.log("Connected to MongoDB successfully");

            try {
                await ViaGoogleUser.syncIndexes();
                console.log("ViaGoogleUser indexes synchronized successfully");
            } catch (indexError) {
                console.error("Error synchronizing ViaGoogleUser indexes:", indexError);
            }
        })
        .catch((err) =>
            console.error("Error connecting to MongoDB:", err)
        );
}

export default connectToDatabase;
