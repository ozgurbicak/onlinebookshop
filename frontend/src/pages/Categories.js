import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import BooksCard from "../components/BooksCard";

function Categories() {
  const [bookData, setBookData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Books");

  const data = useLoaderData();

  useEffect(() => {
    if (data && data.data) {
      setBookData(data.data);

      const allCategories = data.data.reduce((acc, book) => {
        const bookCategories = book.category
          .split(",")
          .map((cat) => cat.trim())
          .filter((cat) => cat !== "");
        return [...acc, ...bookCategories];
      }, []);
      setCategories(["All Books", ...new Set(allCategories)]);
    }
  }, [data]);

  const filteredBooks =
    selectedCategory && selectedCategory !== "All Books"
      ? bookData.filter((book) =>
          book.category
            .split(",")
            .map((cat) => cat.trim())
            .includes(selectedCategory)
        )
      : bookData;

  return (
    <div className="py-10">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl bg-black text-white py-2 w-80 text-center">
          Categories
        </h1>
        <span className="w-24 h-[3px] bg-black"></span>
        <ul className="flex flex-wrap justify-center gap-2">
          {categories.map((category, index) => (
            <li
              key={index}
              onClick={() => setSelectedCategory(category)}
              className={`cursor-pointer px-4 py-2 border ${
                selectedCategory === category
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className="py-10">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl bg-black text-white py-2 w-80 text-center">
            {selectedCategory && selectedCategory !== "All Books"
              ? `${selectedCategory} Books`
              : "All Books"}
          </h1>
          <span className="w-24 h-[3px] bg-black"></span>
        </div>

        <div className="max-w-screen-xl mx-auto py-10 grid grid-cols-4 gap-10">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <BooksCard key={book.id} bookData={book} />
            ))
          ) : (
            <p>Please select a category to view books.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Categories;
