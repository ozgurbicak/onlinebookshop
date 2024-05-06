import { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
function List() {
  const [list, setList] = useState([]);

  const booksData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/books");

      if (response.data.success) {
        setList(response.data.data);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const removeBook = async (bookId) => {
    const response = await axios.post("http://localhost:5000/api/remove/book", {
      id: bookId,
    });
    await booksData();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    booksData();
  }, []);

  return (
    <div className="list add flex-col">
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Book Name</b>
          <b>Author Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img className="book" src={`${item.image}`} alt="" />
              <p>{item.book_name}</p>
              <p>{item.author_name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeBook(item.id)} className="cursor">
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;
