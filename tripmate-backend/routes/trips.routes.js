import express from "express";
import Trip from "../models/Trip.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(protect);

// GET /api/trips
router.get("/", async (req, res) => {
    try {
        const trips = await Trip.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(trips);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/trips
router.post("/", async (req, res) => {
    const { name, destination, duration, itinerary, members, city, days } = req.body;
    try {
        const trip = await Trip.create({
            userId: req.user.id,
            name,
            destination: destination || city,
            duration: duration || days,
            itinerary: itinerary || {},
            members: members || [],
        });
        res.status(201).json(trip);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// PUT /api/trips/:id
router.put("/:id", async (req, res) => {
    try {
        const trip = await Trip.findOne({ _id: req.params.id, userId: req.user.id });
        if (!trip) {
            return res.status(404).json({ message: "Trip not found." });
        }
        const updated = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE /api/trips/:id
router.delete("/:id", async (req, res) => {
    try {
        const trip = await Trip.findOne({ _id: req.params.id, userId: req.user.id });
        if (!trip) {
            return res.status(404).json({ message: "Trip not found." });
        }
        await trip.deleteOne();
        res.json({ success: true, message: "Trip deleted." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;