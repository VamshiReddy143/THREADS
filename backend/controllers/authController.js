const userModel = require("../models/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.REGISTER = async (req, res,next) => {
  const { username, fullName, email, password } = req.body;
  try {
    if (!fullName || !username || !email || !password) {
      return res
        .status(401)
        .json({ message: "All fields are required", success: false });
    }

    const existingemail = await userModel.findOne({ email });
    if (existingemail) {
      return res
        .status(401)
        .json({
          message: "user already exists with this email",
          success: false,
        });
    }

    const existingUser = await userModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      message: "user registered successfully",
      success: true,
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      email: newUser.email,
      followers: newUser.followers,
      following: newUser.following,
      profileImg: newUser.profileImg,
      coverImg: newUser.coverImg,
    });
  } catch (error) {
         next(error)
  }
};


exports.LOGIN=async(req,res,next)=>{
    const {email,password}=req.body
    try {
        
        if(!email || !password){
            return res.status(400).json({message:"All fields are required",success:false})
        }


        const user=await userModel.findOne({email})
        if(!user){
            return res.status(400).json({message:"INVALID CREDENTIALS",success:false})
        }


        const isPasswordMatch=await bcrypt.compare(password,user.password)
        if(!isPasswordMatch){
            return res.status(400).json({message:"INVALID CREDENTIALS",success:false})
        }


        const token=await jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"10d"})


        const SanitizeUser={
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            email: user.email,
            followers: user.followers,
            following: user.following,
            profileImg: user.profileImg,
            coverImg: user.coverImg,
        }


        return res.cookie("token",token,{
            httpOnly:true,
            sameSite:"strict",
            maxAge: 1 * 24 * 60 * 1000
        }).json({
            message:`WELCOME back ${SanitizeUser.username}`,
            success:true,
            user:SanitizeUser
        })
        
    } catch (error) {
        next(error)
    }
}



exports.LOGOUT=async(req,res,next)=>{
    try {
        res.cookie("token","",{maxAge:0})
        res.status(200).json({ message: "Logged out successfully" ,success:true});
    } catch (error) {
        next(error)
    }
}



exports.GETME=async(req,res,next)=>{
    try {
        const user=await userModel.findById(req.user._id).select("-password")
        res.status(200).json(user);
    } catch (error) {
        next(error)
    }
}




