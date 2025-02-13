import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import { Transaction } from "./models/transactio.js";
import dotenv from "dotenv";
const app = express();
dotenv.config()
const MONGO_URL = process.env.MONGO_URL;
app.use(cors())
app.use(express.json())
app.get("/api/test", (req, res) => {
    res.json("ok")
})
app.post("/api/transaction", async (req, res) => {
    await mongoose.connect(MONGO_URL);
    const { title, date, description, price } = req.body;
    const transaction = await Transaction.create({ title, price, description, date });
    res.json(transaction)
})
app.get("/api/gettransactions", async (req, res) => {
    await mongoose.connect(MONGO_URL);
    const transactions = await Transaction.find();
    res.json(transactions);
})
app.listen(4041, () => {
    console.log("The server is running on port 4041")
})