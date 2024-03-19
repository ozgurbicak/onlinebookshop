import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Books from "../components/Books";
import { useLoaderData } from "react-router";

function Home() {
  const [books, setBooks] = useState([]);
  const data = useLoaderData();
  useEffect(() => {
    setBooks(data.data);
  }, [data]);
  return (
    <div>
      <Banner />
      <Books books={books} />
    </div>
  );
}

export default Home;
