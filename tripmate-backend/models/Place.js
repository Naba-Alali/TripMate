import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
        enum: ["Riyadh", "Jeddah", "Abha", "AlUla", "AlHassa"],
    },
    description: String,
    category: {
        type: String,
        enum: ["landmark", "food", "nature", "shopping", "entertainment"],
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    image: String,
});

const Place = mongoose.model("Place", placeSchema);
export default Place;