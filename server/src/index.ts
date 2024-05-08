import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import scooterRoutes from './routes/scooterRoutes';
import accountRoutes from './routes/accountRoutes';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.MONGO_URL) {
  console.error("Mongo URL is not set");
  process.exit(1);
}

app.use('/api/scooters', scooterRoutes);
app.use('/api/accounts', accountRoutes);

mongoose.connect(process.env.MONGO_URL);

app.listen(process.env.PORT, () => {
  console.log(`Server is running via port ${process.env.PORT}`);
});
