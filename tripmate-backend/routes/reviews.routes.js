import express from "express";
import Review from "../models/Review.js";
import { protect } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/:placeId", protect, async (req, res) => {

    if (!req.user) {
        return res.status(401).json({ message: "Login required" });
    }

    const { rating, comment } = req.body;

    if (!rating || !comment) {
        return res.status(400).json({ message: "Rating and comment required" });
    }

    try {
        const existingReview = await Review.findOne({
            placeId: req.params.placeId,
            userId: req.user._id,
        });

        if (existingReview) {
            return res.status(400).json({
                message: "You already reviewed this place"
            });
        }

        await Review.create({
            placeId: req.params.placeId,
            userId: req.user._id,
            userName: req.user.name || req.user.email,
            rating,
            comment,
        });

        res.status(201).json({ message: "Review added" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});