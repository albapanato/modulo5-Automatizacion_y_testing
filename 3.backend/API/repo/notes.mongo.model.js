import mongoose from "mongoose"; // npm install mongoose

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});
export const NoteModel = mongoose.model("Note", noteSchema);
