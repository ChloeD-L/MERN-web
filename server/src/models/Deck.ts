import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const DeckSchema = new Schema({
  // author: ObjectId,
  title: String,
  // body: String,
  // date: Date,
});

export const DeckModel = mongoose.model("Deck", DeckSchema);
