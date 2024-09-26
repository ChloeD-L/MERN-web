import express, { Response, Request } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { DeckModel } from "./models/Deck";
import cors from "cors";

dotenv.config();

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_NAME = process.env.DB_NAME;
const PORT = process.env.PORT;
// const MONGODB_URL = process.env.MONGODB_URL;

// 663f81758a35f11797908f3f

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  throw new Error("MONGODB_URL is not defined in environment variables");
}

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log(`Connected to MongoDB`);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

app.get("/decks", async (req: Request, res: Response) => {
  const decks = await DeckModel.find();
  // console.log(decks);
  res.json(decks);
});

app.post("/deck", async (req: Request, res: Response) => {
  const deck = new DeckModel({
    title: req.body.title,
  });
  const createDeck = await deck.save();
  res.json(createDeck);
});

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.delete("/deck/:deckId", async (req: Request, res: Response) => {
  const deckId = req.params.deckId;
  const deck = await DeckModel.findByIdAndDelete(deckId);
  res.json(
    //   {
    //   message: "successfullu deleted the entity",
    // }
    deck
  );
});
