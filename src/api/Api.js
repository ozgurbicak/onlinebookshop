import axios from "axios";

export async function booksData() {
  const books = await axios.get("http://localhost:5000/api/books");
  console.log(books);
  return books;
}

// export async function booksData() {
//   try {
//     const response = await axios.get("http://localhost:5000/api/books");
//     return response;
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }
