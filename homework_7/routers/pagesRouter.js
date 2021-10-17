import { Router } from "express";
import {
  getAllBooks,
  getBook,
  createBook,
  changeBook,
  deleteBook,
} from "../controllers.js";
import { validateFields } from "../middleware.js";

const router = Router();

// Main page
router.get("/", async (req, res) => {
  res.render("main", {
    page: "main",
  });
});

// Get all book
router.get("/books", async (req, res) => {
  const books = await getAllBooks();

  res.render("books", {
    title: "Books",
    books: books,
    page: "books",
  });
});

// Get book
router.get("/books/:id", async (req, res) => {
  let targetBook = await getBook(req);

  res.render("book", {
    title: targetBook.title,
    book: targetBook,
  });
});

// Create book
router.get("/books/book/create", (req, res) => {
  res.render("form", {
    title: "Create book",
    mode: "Create",
  });
});

router.post("/books/book/create", validateFields, async (req, res) => {
  let newBook = await createBook(req);
  res.redirect(`/books/${newBook.id}`);
});

//Delete book
router.get("/books/:id/delete", async (req, res) => {
  await deleteBook(req);
  res.redirect("/books");
});

//Change book
router.get("/books/:id/edit", async (req, res) => {
  let targetBook = await getBook(req);
  res.render("form", {
    title: "Change book",
    mode: "Change",
    book: targetBook,
  });
});

router.post("/books/:id/edit", validateFields, async (req, res) => {
  let changedBook = await changeBook(req);
  res.redirect(`/books/${changedBook.id}`);
});

export default router;