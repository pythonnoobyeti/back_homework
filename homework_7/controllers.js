import { readBooks, writeBooks, createId } from "./functions.js";
import { pathToBooksJSON } from "./index.js";

const login = (req, res) => {
  res.status(201).json({ id: 1, mail: "test@mail.ru" });
};

const getAllBooks = async (req) => {
  return await readBooks(pathToBooksJSON);
};

const getBook = async (req) => {
  const { id } = req.params;
  const books = await readBooks(pathToBooksJSON);
  const targetBook = books.filter((book) => book.id === id)[0];
  if (targetBook) return targetBook;
};

const createBook = async (req) => {
  let books = await readBooks(pathToBooksJSON);
  let { title, description, authors } = req.body;
  let cover = req.file.filename;
  const newBook = { title, description, authors, cover };
  const newId = createId(books);
  newBook.id = newId;
  books.push(newBook);
  await writeBooks(pathToBooksJSON, books);
  return newBook;
};

const changeBook = async (req) => {
  const { id } = req.params;
  const books = await readBooks(pathToBooksJSON);
  const targetIndex = books.findIndex((book) => book.id === id);
  let bookIsChange = false;

  if (targetIndex === -1) return;

  for (let field in req.body) {
    if (field in books[targetIndex] && field != "id") {
      books[targetIndex][field] = req.body[field];
      bookIsChange = true;
    }
  }

  if (bookIsChange) await writeBooks(pathToBooksJSON, books);
  return books[targetIndex];
};

const deleteBook = async (req) => {
  const { id } = req.params;
  const books = await readBooks(pathToBooksJSON);
  const filterBooks = books.filter((book) => book.id != id);
  if (books.length === filterBooks.length) return;
  await writeBooks(pathToBooksJSON, filterBooks);
  return filterBooks[0];
};

export { login, getAllBooks, getBook, createBook, changeBook, deleteBook };
