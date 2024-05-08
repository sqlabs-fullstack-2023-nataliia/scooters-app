import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  verifyCode: Number,
  avatar: {type: String, default: 'https://play-lh.googleusercontent.com/7Ak4Ye7wNUtheIvSKnVgGL_OIZWjGPZNV6TP_3XLxHC-sDHLSE45aDg41dFNmL5COA=w240-h480-rw'},
  location: {
    lat: Number,
    long: Number,
  },
  isVerify: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export const Account = mongoose.model("Account", accountSchema);