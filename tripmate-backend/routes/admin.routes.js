import express from "express";
import User from "../models/User.js";
import { protect, adminOnly } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect, adminOnly);

// GET /api/admin/users
router.get("/users", async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/admin/users/:id
router.put("/users/:id", async (req, res) => {
    try {
        const updated = await User.findByIdAndUpdate(
            req.params.id,
            { fullName: req.body.fullName, email: req.body.email },
            { new: true }
        ).select("-password");

        if (!updated) return res.status(404).json({ message: "User not found." });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/admin/users/:id
router.delete("/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "User not found." });
        res.json({ success: true, message: "User deleted." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;