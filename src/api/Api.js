import axios from "axios";

export async function booksData() {
  const books = await axios.get(
    "https://private-anon-d2a5e6a60a-bookstore.apiary-mock.com/data/books"
  );
  return books;
}
