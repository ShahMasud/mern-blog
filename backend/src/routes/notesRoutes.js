import express from "express";
import { getAllNotes, creatNote,updateNote, deleteNote, getNoteById } from "../controllers/notesController.js";
// import { creatNote, getAllNotes, updateNote } from "../controllers/routesController";
const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNoteById);
router.post("/", creatNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;