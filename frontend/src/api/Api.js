import axios from "axios";

export async function booksData() {
  const books = await axios.get("http://localhost:5000/api/books");
  return books;
}
export async function usersData() {
  const users = await axios.get("http://localhost:5000/api/users");
  return users;
}
