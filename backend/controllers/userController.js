import { sendWelcomeEmail } from "../utils/emailService.js"; // Import the email sending function
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Matching email
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    //Matching password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    //If both are matched create a json web token
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error" });
  }
};

// create json token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Register user
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    //checking is user already exist
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    //validating email format
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Validating password: length and allowed characters
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong password with at least 8 characters",
      });
    }
    // Regular expression to check for allowed characters: capital letters, digits, and @ or .
    const allowedPattern = /^[A-Za-z0-9@.]+$/;
    if (!allowedPattern.test(password)) {
      return res.json({
        success: false,
        message:
          "Password can only contain capital letters, numeric digits, and @ or . characters",
      });
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    //save user in DB
    const user = await newUser.save();

    // Send welcome email
    await sendWelcomeEmail(email, name); // Send email after user registration

    //And create a json webtoken
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Internal server error" });
  }
};

export { loginUser, registerUser };
