import mongoose from "mongoose";

const connectToDatabase = async () => {

    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch((err) =>
        console.error("Error connecting to MongoDB:", err)
    );
}

export default connectToDatabase;