import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://aterana3:zqu24ngw.J9H6bV@cluster0.7nrej9y.mongodb.net/");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}