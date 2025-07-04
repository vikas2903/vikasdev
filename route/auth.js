import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js"; // Adjust the path as necessary

const router = express.Router();

// This route handles user registration
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({email});
    if(existingUser){
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully into our Database" });

  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req,res) =>{
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user){
        return res.status(400).json({ message: "User not found" });
    }
    // Check password

    const isMatch  = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({ message: "Invalid credentials" });
    }
    
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, user: { id: user._id, email: user.email } });


})

export default router;
