import { Router } from "express";
import {
  getAllBooks,
  getBook,
  createBook,
  changeBook,
  deleteBook,
} from "../controllers.js";

const router = Router();

router
  .get("/", getAllBooks)
  .get("/:id", getBook)
  .post("/", createBook)
  .put("/:id", changeBook)
  .delete("/:id", deleteBook);

export default router;
