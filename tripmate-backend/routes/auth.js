import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const router = express.Router();

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

// POST /api/auth/register
router.post("/register", async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        const exists = await User.findOne({ email: email.toLowerCase() });
        if (exists) {
            return res.status(400).json({ message: "An account with this email already exists." });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            fullName,
            email,
            password: hashedPassword,
        });
        res.status(201).json({
            success: true,
            user: {
                name: newUser.fullName,
                email: newUser.email,
                role: newUser.role,
                joinedAt: newUser.joinedAt,
            },
            token: generateToken(newUser),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: "No account found with this email." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }
        res.json({
            success: true,
            user: {
                name: user.fullName,
                email: user.email,
                role: user.role,
                joinedAt: user.joinedAt,
            },
            token: generateToken(user),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;