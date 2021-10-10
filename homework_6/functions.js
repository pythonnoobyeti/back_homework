import fs from "fs";
import { finished } from "stream/promises";

const readBooks = async (pathToBooksJSON) => {
  const rs = fs.createReadStream(pathToBooksJSON, { encoding: "UTF-8" });
  let data = "";

  rs.on("data", (chunk) => {
    data += chunk;
  });

  rs.on("end", () => {
    if (data) data = JSON.parse(data);
  });

  await finished(rs);
  return data;
};

const writeBooks = async (pathToBooksJSON, books) => {
  const ws = fs.createWriteStream(pathToBooksJSON);
  books = JSON.stringify(books);
  await ws.write(books);
};

const createId = (books) => {
  const id = books.length === 0 ? 1 : +books[books.length - 1].id + 1;
  return String(id);
};

export { readBooks, writeBooks, createId };
