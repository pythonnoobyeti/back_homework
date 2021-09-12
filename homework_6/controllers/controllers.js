import path from "path";
import {
  readBooks,
  writeBooks,
  validateFields,
  createId,
} from "../functions/functions.js";

const pathToBooksJSON = path.join(path.resolve(), "homework_6", "books.json");

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
  const newBook = validateFields(req.body);
  if (newBook) {
    const id = createId(books);
    newBook.id = id;
    books.push(newBook);
    await writeBooks(pathToBooksJSON, books);
    res.json(newBook);
  } else res.status(404).send("Check require fields in documentation.");
};

const changeBook = async (req, res) => {
  const { id } = req.params;
  const books = await readBooks(pathToBooksJSON);
  const targetIndex = books.findIndex((book) => book.id === id);

  if (targetIndex === -1) res.status(404).send("Book not found!");
  else {
    const fieldToChange = req.body;
    const allowFields = Object.keys(books[targetIndex]);
    Object.keys(books[targetIndex]).forEach((field) => {
      if (allowFields.includes(field) && field != "id")
        books[targetIndex][field] = fieldToChange[field];
    });
    console.log(books);
    await writeBooks(pathToBooksJSON, books);
    res.send("OK");
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;
  const books = await readBooks(pathToBooksJSON);
  const filterBooks = books.filter((book) => book.id != id);
  await writeBooks(pathToBooksJSON, filterBooks);
  res.send("OK");
};

export { login, getAllBooks, getBook, createBook, changeBook, deleteBook };
