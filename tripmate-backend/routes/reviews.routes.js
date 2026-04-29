import express from "express";
import Review from "../models/Review.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// GET /api/reviews/:placeId — جيب كل reviews حق مكان
router.get("/:placeId", async (req, res) => {
    try {
        const reviews = await Review.find({ placeId: req.params.placeId }).sort({ createdAt: -1 });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/reviews/:placeId — أضف review
router.post("/:placeId", protect, async (req, res) => {
    const { rating, comment } = req.body;
    try {
        const review = await Review.create({
            placeId: req.params.placeId,
            userId: req.user.id,
            userName: req.user.email.split("@")[0],
            rating,
            comment,
        });
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;