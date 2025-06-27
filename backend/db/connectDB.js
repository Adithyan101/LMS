import mongoose from "mongoose";

export const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGOOSE_URI);
        console.log(`Database connected in ${process.env.MONGOOSE_URI}`);
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}