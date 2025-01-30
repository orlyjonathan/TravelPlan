import express from 'express';
import mongoose from "mongoose";
import cookieParser from 'cookie-parser'; 
import cors from 'cors'; //npm install cors
const jwt = require('jsonwebtoken');
import dotenv from 'dotenv';
dotenv.config();

const app = express()
const port = process.env.PORT || 3001;
const dbPassword=process.env.DB_PASSWORD as string;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser());


//DB
const DBurl = process.env.DB_URL;

if (!DBurl) {
    console.error("ERROR: DB_URL is not defined in .env file");
    process.exit(1); // Stop execution if the DB URL is missing
}

mongoose.connect(DBurl)
    .then(() => console.info("✅ DB connected successfully"))
    .catch((err) => console.error("DB connection error:", err));


//routes
import authRoutes from './routes/authRoutes';
app.use("/api/auth", authRoutes);
import itineraryRoutes from './routes/itineraryRoutes';
app.use("/api/itinerary", itineraryRoutes);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

