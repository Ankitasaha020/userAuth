import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from './config/connectdb.js';

const  app = express();
const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;

// cors policy
app.use(cors());

// JSON
app.use(express.json());

// Connect Database
connectDB(DATABASE_URL);

// Routes

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});


