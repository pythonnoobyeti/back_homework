import { Router } from "express";
import { checkRequiredFields } from "../middelwares/checkRequiredFields.js";
import { validateFields } from "../middelwares/validateFields.js";
import { upload } from "../middelwares/upload.js";
import {
  getAllBooks,
  getBook,
  createBook,
  changeBook,
  deleteBook,
} from "../controllers.js";

const router = Router();

//Get all books
router.get("/", async (req, res) => {
  const books = await getAllBooks(req);
  res.json(books);
});

//Get book
router.get("/:id", async (req, res) => {
  const targetBook = await getBook(req);
  if (targetBook) return res.json(targetBook);
  res.status(404).send("Book not found!");
});

//Create book
router.post(
  "/",
  upload.single("cover"),
  checkRequiredFields,
  validateFields,
  async (req, res) => {
    const newBook = await createBook(req);
    res.json(newBook);
  }
);

//Delete book
router.delete("/:id", async (req, res) => {
  const deletedBook = await deleteBook(req);
  if (deletedBook) return res.send("OK");
  res.send("Book not found!");
});

//Change book
router.put("/:id", upload.single("cover"), validateFields, async (req, res) => {
  const changedBook = await changeBook(req);
  if (!changedBook) return res.status(404).send("Book not found!");
  res.send("OK");
});

export default router;
