#!/usr/bin/env node
import express from "express";
import userRouter from "./routers/userRouter.js";
import booksRouter from "./routers/booksRouter.js";
import { validateFields } from "./middleware.js";
import fs from "fs";

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

if (!fs.existsSync(`${__dirname}/books.json`)) {
  const ws = fs.createWriteStream(`${__dirname}/books.json`);
  ws.write("[]");
  ws.close();
}

app
  .use(express.json())
  .use(validateFields)
  .use("/api/user", userRouter)
  .use("/api/books", booksRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
