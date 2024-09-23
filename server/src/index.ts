import express, { Response, Request } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { DeckModel } from "./models/Deck";

dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT;

// 663f81758a35f11797908f3f

const app = express();

app.use(express.json());

app.post("/deck", async (req: Request, res: Response) => {
  const deck = new DeckModel({
    title: "Deck 1",
  });
  const createDeck = await deck.save();
  res.json(createDeck);
});

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

const db = mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/`).then(() => {
  console.log(`Listening on port ${PORT}`);
  app.listen(5024);
});
