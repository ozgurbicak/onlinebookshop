import React from "react";
import BooksCard from "./BooksCard";
function Books({ books }) {
  return (
    <div className="py-10">
      <div className="flex flex-col items-center gap-4 ">
        <h1 className="text-2xl bg-black text-white py-2 w-80 text-center">
          Shopping Books
        </h1>
        <span className="w-24 h-[3px]  bg-black"></span>
        <p className="max-w-[700px] text-gray-600 text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non
          risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec,
          ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula
          massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci
          nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl
          sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae,
          consequat in, pretium a, enim. Pellentesque congue. Ut in risus
          volutpat libero pharetra tempor. Cras vestibulum bibendum augue.
          Praesent egestas leo in pede. Praesent blandit odio eu enim.
          Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum
          primis in faucibus orci luctus et ultrices posuere cubilia Curae;
          Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum.
          Maecenas adipiscing ante non diam sodales hendrerit.
        </p>
      </div>

      <div className="max-w-screen-xl mx-auto py-10 grid grid-cols-4 gap-10">
        {/* her bir kitap için bookscard oluşturuyoruz */}

        {books.map((item) => (
          <BooksCard key={item.id} bookData={item} />
        ))}
      </div>
    </div>
  );
}

export default Books;
