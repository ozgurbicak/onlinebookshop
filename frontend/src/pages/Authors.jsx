import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import BooksCard from "../components/BooksCard";

function Authors() {
  const [bookData, setBookData] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("All Books");

  const data = useLoaderData();

  useEffect(() => {
    if (data && data.data) {
      setBookData(data.data);

      const allAuthors = data.data
        .map((book) => book.author_name)
        .filter((author) => author !== "");
      setAuthors(["All Books", ...new Set(allAuthors)]);
    }
  }, [data]);

  const filteredBooks =
    selectedAuthor && selectedAuthor !== "All Books"
      ? bookData.filter((book) => book.author_name === selectedAuthor)
      : bookData;

  return (
    <div className="py-10">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl bg-black text-white py-2 w-80 text-center">
          Authors
        </h1>
        <span className="w-24 h-[3px] bg-black"></span>
        <ul className="flex flex-wrap justify-center gap-2">
          {authors.map((author, index) => (
            <li
              key={index}
              onClick={() => setSelectedAuthor(author)}
              className={`cursor-pointer px-4 py-2 border ${
                selectedAuthor === author
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {author}
            </li>
          ))}
        </ul>
      </div>

      <div className="py-10">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl bg-black text-white py-2 w-80 text-center">
            {selectedAuthor && selectedAuthor !== "All Books"
              ? `${selectedAuthor}'s Books`
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
            <p>Please select an author to view books.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Authors;
