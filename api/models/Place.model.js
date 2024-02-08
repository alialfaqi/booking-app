import mongoose from "mongoose";

const placeSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: String,
    adress: String,
    photos: [String], //[String]==> mean array of strings
    description: String,
    perks: [String],
    extraInfo: String,
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number
})

export const placeModel = mongoose.model("Place", placeSchema);

