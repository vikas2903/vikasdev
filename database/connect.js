import mongoose from "mongoose";

const connectToDatabase = async () => {
    const uri = process.env.MONGO_URI || "mongodb+srv://vikasprasad2903:fkkbpuJg7iHm7dB4@cluster0.nq7t1.mongodb.net/meta_analytics";

    await mongoose.connect(uri)
        .then(() => {
            console.log("Connected to MongoDB successfully");
        })
        .catch((err) =>
            console.error("Error connecting to MongoDB:", err)
        );
}

export default connectToDatabase;