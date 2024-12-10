const userModel=require("../models/authModel")
const jwt=require("jsonwebtoken")


exports.protectRoute=async(req,res,next)=>{
    try {
        const token=req.cookies.token

        if (!token) {
			return res.status(401).json({ error: "Unauthorized: No Token Provided" });
		}

        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if (!decoded) {
			return res.status(401).json({ error: "Unauthorized: Invalid Token" });
		}

        const user=await userModel.findById(decoded.userId).select("-password")
        if (!user) {
			return res.status(404).json({ error: "User not found" });
		}

        req.user=user
        next()
    } catch (error) {
        next(error)
    }
}