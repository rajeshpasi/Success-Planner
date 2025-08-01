import userService from "../services/auth.service.js";
import jwt from "jsonwebtoken";
import axios from "axios";
import bcrypt from "bcrypt";

// Cookie config
const cookieConfig = {
  httpOnly: true,
  secure: false,
  sameSite: "Lax", // <-- Yeh karo
  maxAge: 24 * 60 * 60 * 1000, // 1 day
}

export const register = async (req, res, next) => {
  try {
    const { fullName: { firstName, lastName }, email, password, confirmPassword, terms } = req.body;

    // Check if user already exists
    const existingUser = await userService.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = await userService.createUser({
      fullName: { firstName, lastName },
      email,
      password,
      confirmPassword,
      terms,
      role: "user", // Default role
      Picture: null, // Default picture can be set later
      provider: "self", // Default provider
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        fullName: newUser.fullName,
        provider: newUser.provider,
      }
    });
  } catch (error) {
    next(error);
  }
};


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userService.getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Set cookie
    res.cookie("token", token, cookieConfig);

    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        fullName: user.fullName,
        provider: user.provider,
      }
    });
  } catch (error) {
    next(error);
  }
}

export const googleAuth = async (req, res, next) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: "Authorization code not provided" });
    }

    // 1️⃣ Exchange code for token
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: process.env.GOOGLE_REDIRECT_URI,
        grant_type: "authorization_code",
      }
    );

    const { access_token } = tokenResponse.data;

    // 2️⃣ Get user info from Google
    const googleUser = await axios.get(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
    );

    // Fix: Use correct fields from Google response
    const { email, given_name: firstName, family_name: lastName, picture } = googleUser.data;

    if (!email) {
      return res
        .status(400)
        .json({ error: "Failed to get user email from Google" });
    }

    // 3️⃣ Check if user exists
    let user = await userService.getUserByEmail(email);

    if (!user) {
      // 🔐 Create hashed random password
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await userService.createUser({
        fullName: { firstName, lastName },
        email,
        picture,
        password: hashedPassword,
        provider: "google",
        terms: true, // <-- Add this line
      });
    }

    // 4️⃣ Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "7d" }
    );

    // 5️⃣ Set cookie (same as normal login)
    res.cookie("token", token, cookieConfig);

    res.status(200).json({
      message: "Google Login Successful",
      user: {
        id: user._id,
        fullName: { firstName: user.fullName.firstName, lastName: user.fullName.lastName },
        email: user.email,
        picture: user.picture,
      },
    });
  } catch (err) {
    // If it's an axios error, the details are often in `err.response.data`
    console.error("Google login error:", err.response?.data || err.stack || err);
    res.status(500).json({ error: "Server error during Google login" });
  }
}

export const logout = (req, res) => {
  res.clearCookie("token", cookieConfig);
  res.status(200).json({ message: "Logout successful" });
};

export const profile = (req, res) => {
  const user = req.user; // User is set by the protect middleware
  res.status(200).json({
    user: {
      id: user._id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
      Picture: user.Picture,
      provider: user.provider,
    }
  });
}
