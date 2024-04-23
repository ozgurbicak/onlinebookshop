import axios from "axios";

export async function authorsData() {
  const author = await axios.get(
    "https://private-anon-d2a5e6a60a-bookstore.apiary-mock.com/authors"
  );
  return author;
}

// export async function getBooks() {
//   const books = await axios.get("https://bookstore-api.p.rapidapi.com/books");
//   return books;
// }
