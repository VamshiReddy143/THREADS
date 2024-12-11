const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const  connectDB  = require("./config/db");
const errorMiddleware = require("./middlewares/errorMiddleware");



const authRouter = require("./routes/authRouter");
const postRouter =require("./routes/postRouter")
const userRouter=require("./routes/userRouter")

// Load environment variables
dotenv.config();

// Set up port
const PORT = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// CORS setup
const corsOptions = {
  origin: "http://localhost:5173", // Adjust to your frontend URL
  credentials: true,
};
app.use(cors(corsOptions));

//Routes
app.use("/api/auth", authRouter);
app.use("/api/posts",postRouter)
app.use("/api/users",userRouter)

// Global Error Handling Middleware
app.use(errorMiddleware);

// Start server
app.listen(PORT, () => {
  connectDB(); // Establish DB connection
  console.log(`Server running on port ${PORT}`);
});
