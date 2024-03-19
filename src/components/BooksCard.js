import React from "react";

function BooksCard({ book }) {
  return (
    <div className="group">
      <div className="cursor-pointer overflow-hidden">
        {console.log(book)}

        <img
          className="w-full h-auto max-w-[300px] max-h-[300px] object-contain object-center group-hover:scale-105 duration-500"
          src={book.image}
          alt="bookImage"
        />
      </div>
      <div className=" p-4">
        <h2 className="text-lg font-semibold mb-2 text-center">{book.title}</h2>
        <p className="text-gray-600 mb-2 text-center">{book.author}</p>

        <div className="flex justify-between items-center p-1 m-3">
          <p className="text-black font-semibold">
            {book.price.displayValue} USD
          </p>
          <button className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default BooksCard;
