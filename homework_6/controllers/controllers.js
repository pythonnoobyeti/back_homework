import fs from "fs";
import path from "path";

const __dirname = path.resolve();

function login(req, res) {
  res.status(201).json({ id: 1, mail: "test@mail.ru" });
}

function getAllBooks(req, res) {
  if (req.query.id == 2) res.send("Hello");
  else res.send("By");
}

function getBook(req, res) {
  const params = req.params;
  res.status(200).json(params);
}

function createBook(req, res) {
  res.status(200).json({ id: 1, mail: "test@mail.ru" });
}

function changeBook(req, res) {
  res.status(200).json({ id: 1, mail: "test@mail.ru" });
}

function deleteBook(req, res) {
  res.status(200).json({ id: 1, mail: "test@mail.ru" });
}

export { login, getAllBooks, getBook, createBook, changeBook, deleteBook };
