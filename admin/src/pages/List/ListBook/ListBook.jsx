import { useEffect, useState } from "react";
import "./ListBook.css";
import axios from "axios";
import { toast } from "react-toastify";
import EditBook from "./EditBook";

function List() {
  const [list, setList] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const booksData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/books");

      if (response.data.success) {
        setList(response.data.data);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeBook = async (bookId) => {
    const response = await axios.post("http://localhost:5000/api/remove/book", {
      id: bookId,
    });
    if (response.data.success) {
      await booksData();
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  const editBook = (book) => {
    setSelectedBook(book);
  };

  useEffect(() => {
    booksData();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Books List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <h3>Image</h3>
          <h3>Book Name</h3>
          <h3>Author Name</h3>
          <h3>Category</h3>
          <h3>Price</h3>
          <h3>Stock</h3>
          <h3>Action</h3>
        </div>
        {list.map((item, index) => (
          <div key={index} className="list-table-format">
            <img className="book" src={item.image} alt={item.book_name} />
            <p>{item.book_name}</p>
            <p>{item.author_name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p>{item.stock}</p>{" "}
            <div className="actions">
              <button onClick={() => editBook(item)}>Edit</button>
              <p onClick={() => removeBook(item.id)} className="cursor">
                X
              </p>
            </div>
          </div>
        ))}
      </div>
      {selectedBook && (
        <EditBook
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onSave={booksData}
        />
      )}
    </div>
  );
}

export default List;
