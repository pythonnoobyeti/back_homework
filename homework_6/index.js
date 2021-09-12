#!/usr/bin/env node
import express from "express";
import userRouter from "./routers/userRouter.js";
import booksRouter from "./routers/booksRouter.js";
import fs from "fs";

const app = express();
const port = 3000;

if (!fs.existsSync("./homework_6/books.json")) {
  const ws = fs.createWriteStream("./homework_6/books.json");
  ws.write("[]");
  ws.close();
}

app
  .use(express.json())
  .use("/api/user", userRouter)
  .use("/api/books", booksRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
