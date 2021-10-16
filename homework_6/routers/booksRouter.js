import { Router } from "express";
import { validateFields } from "../middleware.js";
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
  .post("/", validateFields, createBook)
  .put("/:id", changeBook)
  .delete("/:id", deleteBook);

export default router;
