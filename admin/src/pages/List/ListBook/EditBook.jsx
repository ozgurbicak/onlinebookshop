import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function EditBook({ book, onClose, onSave }) {
  const [bookName, setBookName] = useState(book.book_name);
  const [authorName, setAuthorName] = useState(book.author_name);
  const [category, setCategory] = useState(book.category);
  const [price, setPrice] = useState(book.price);
  const [stock, setStock] = useState(book.stock);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/edit/book", {
        id: book.id,
        book_name: bookName,
        author_name: authorName,
        category: category,
        price: price,
        stock: stock,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        onSave();
        onClose();
      } else {
        toast.error("Error updating book");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Book</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Book Name:
            <input
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
          </label>
          <label>
            Author Name:
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />
          </label>
          <label>
            Category:
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>
          <label>
            Stock:
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
            />
          </label>
          <button type="submit">Save</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBook;
