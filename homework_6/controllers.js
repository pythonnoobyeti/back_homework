import { readBooks, writeBooks, createId } from "./functions.js";
import { pathToBooksJSON } from "./index.js";

const login = (req, res) => {
  res.status(201).json({ id: 1, mail: "test@mail.ru" });
};

const getAllBooks = async (req, res) => {
  const books = await readBooks(pathToBooksJSON);
  res.json(books);
};

const getBook = async (req, res) => {
  const { id } = req.params;
  const books = await readBooks(pathToBooksJSON);
  const targetBook = books.filter((book) => book.id === id)[0];
  if (targetBook) res.json(targetBook);
  else res.status(404).send("Book not found!");
};

const createBook = async (req, res) => {
  let books = await readBooks(pathToBooksJSON);
  const newBook = req.body;
  const newId = createId(books);
  newBook.id = newId;
  books.push(newBook);
  await writeBooks(pathToBooksJSON, books);
  res.json(newBook);
};

const changeBook = async (req, res) => {
  const { id } = req.params;
  const books = await readBooks(pathToBooksJSON);
  const targetIndex = books.findIndex((book) => book.id === id);
  let bookIsChange = false;

  if (targetIndex === -1) return res.status(404).send("Book not found!");

  for (let field in req.body) {
    if (field in books[targetIndex] && field != "id") {
      books[targetIndex][field] = req.body[field];
      bookIsChange = true;
    }
  }

  if (bookIsChange) await writeBooks(pathToBooksJSON, books);
  res.send("OK");
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  const books = await readBooks(pathToBooksJSON);
  const filterBooks = books.filter((book) => book.id != id);
  if (books.length === filterBooks.length) return res.send("Book not found!");
  await writeBooks(pathToBooksJSON, filterBooks);
  res.send("OK");
};

export { login, getAllBooks, getBook, createBook, changeBook, deleteBook };
