import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import viagogoleusers from "../models/viagogoleusers.js";

const router = express.Router();

// This route handles user registration
router.post("/register", async (req, res) => {

  console.log("Received registration data:", req.body);
  const { name, email, password, phonenumber, privacy } = req.body || {};

  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required"
      });
    }

    const existingUser = await viagogoleusers.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new viagogoleusers({
      email,
      password: hashedPassword,
      name,
      phonenumber,
      privacy: Boolean(privacy),
    });
    await newUser.save();
    res.status(201).json({
      message: "User registered successfully into our Database",
      user: newUser
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log("Received login data:", req.body);

  const user = await viagogoleusers.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  if(user.googleId) {
    return res.status(400).json({ message: "Previously registered with Google" });
  }

  // Check password
 
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(200).json({ token, user: { id: user._id, email: user.email } });

})

router.post ("/logout", (req, res) => {


  jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: '1s' }, (err, token) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Logout failed" });
    }   
    res.status(200).json({ message: "Logged out successfully" });
  });
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error("Logout error:", err);
      return res.status(500).json({ message: "Logout failed" });
    } 
    res.status(200).json({ message: "Logged out successfully" });
  });
});

router.put("/update-profile", async (req, res) => {
  const { name, email, phonenumber, privacy } = req.body;
  const userId = req.user._id;  
  try {
    const updatedUser = await viagogoleusers.findByIdAndUpdate(
      userId, 
      { name, email, phonenumber, privacy },
      { new: true }
    );
    res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  } catch (error) {   
    console.error("Profile update error:", error);

    res.status(500).json({ message: "Profile update failed" });
  }

});
export default router;

router.get("/profile", async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await viagogoleusers.findById(userId).select("-password");
    res.status(200).json({ user });
  }
  catch (error) {
    console.error("Profile retrieval error:", error); 
    res.status(500).json({ message: "Failed to retrieve profile" });
  }
}); 