import React from "react";
import BooksCard from "./BooksCard";
function Books({ books }) {
  console.log(books);
  return (
    <div className="py-10">
      <div className="flex flex-col items-center gap-4 ">
        <h1 className="text-2xl bg-black text-white py-2 w-80 text-center">
          Shopping Books
        </h1>
        <span className="w-24 h-[3px]  bg-black"></span>
        <p className="max-w-[700px] text-gray-600 text-center">
          Are you ready to explore? Are you seeking adventures that open the
          doors to different worlds? Discover exhilarating tales that stretch
          the limits of your imagination! Engage with the latest works from your
          favorite authors and embark on journeys through the enchanting worlds
          of new writers waiting to be uncovered. A book is a journey waiting to
          be embarked upon. Are you ready for the adventure?
        </p>
      </div>

      <div className="max-w-screen-xl mx-auto py-10 grid grid-cols-4 gap-20">
        {books.map((item) => (
          <BooksCard key={item.id} bookData={item} />
        ))}
      </div>
    </div>
  );
}

export default Books;
