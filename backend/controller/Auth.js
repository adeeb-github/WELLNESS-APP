const User=require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require("express");
const dotenv = require("dotenv");
dotenv.config();



exports.signup=async(req,res)=>{
    try{
        const{
            firstName,
            lastName,       
            email,
            password,
            confirmPassword,
            about,

        }=req.body;

        if(!firstName || !lastName || !email || !password || !confirmPassword||!about){
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        if(password!=confirmPassword){
            return res.status(400).json({
                success:false,
                message:"Password and Confirm Password do not match. Please try again."
            })
        }
        //check if user already exists
        const existinguser=await User.findOne({email})

        if(existinguser){
            return res.status(400).json({
                success:false,
                message:"User already exists with this email. Please try another email."
            })

        }

        //hash the password
        const hashedPassword=await bcrypt.hash(password, 10);

        //create a new user
        const user=await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            about,

        });
        
        return res.status(200).json({
            success: true,
            message: "User registered successfully.",
            user
        });
    }
    catch(error){
        console.error("Signup error:", error);
        res.status(500).json({ success: false, message: "An error occurred during signup. Please try again." });
    }
}


exports.login=async(req,res)=>{
    try{
        const {email,password}=req.body;

        //check if email and password are missing
        if(!email || !password){
            return res.status(400).json({ success: false, message: "Email and password are required." });
        }


        //check if user exists
        const user=await User.findOne({email});
        if(!user){
            return res.status(400).json({ success: false, message: "Invalid email or password." });
        }

       // Generate JWT token and Compare Password
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        { email: user.email, id: user._id, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      )

      // Save token to user document in database
      user.token = token
      user.password = undefined
      // Set cookie for token and return success response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      }
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: `User Login Success`,
      })
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      })
    }
  }
    catch(error){
        console.error("Login error:", error);
        res.status(500).json({ success: false, message: "An error occurred during login. Please try again." });
    }
}

