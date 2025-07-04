import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./db/connectDB.js";
import userRoute from "./routes/userRoute.js";
import courseRoute from "./routes/courseRoute.js";

dotenv.config();
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

//api
app.use("/api/v1/user", userRoute);
app.use("/api/v1/course", courseRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
    connectDB();
})