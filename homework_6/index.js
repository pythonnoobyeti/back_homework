import express from "express";
import userRouter from "./routers/userRouter.js";
import booksRouter from "./routers/booksRouter.js";

const app = express();
const port = 3000;

app.use("/api/user", userRouter);
app.use("/api/books", booksRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
