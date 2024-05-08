import mongoose from "mongoose";

const scooterSchema = new mongoose.Schema({
  scooterModel: String,
  scooterType: String,
  scooterBattery: Number,
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  location: {
    lat: Number,
    long: Number,
  },
});

export const Scooter = mongoose.model("Scooter", scooterSchema);
