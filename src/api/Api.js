import axios from "axios";

export async function booksData() {
  const books = await axios.get("http://localhost:5000/api/books");
  return books;
}
