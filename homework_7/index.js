#!/usr/bin/env node
import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import userRouter from "./routers/userRouter.js";
import booksRouter from "./routers/booksRouter.js";
import pagesRouter from "./routers/pagesRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __root = dirname(__filename);
const pathToBooksJSON = `${__root}/books.json`;

if (!fs.existsSync(pathToBooksJSON)) {
  const ws = fs.createWriteStream(pathToBooksJSON);
  ws.write("[]");
  ws.close();
}

const app = express();
const port = 3000;

app.set("view engine", "pug");
app.set("views", path.join(__root, "views"));
app.use(express.static(path.join(__root, "static")));

// API
app.use("/api/user", userRouter);
app.use("/api/books", express.json(), booksRouter);

// Pages
app.use("/", pagesRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { pathToBooksJSON, __root };
