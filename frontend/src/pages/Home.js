import { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Books from "../components/Books";
import { useLoaderData } from "react-router";

function Home() {
  const [bookData, setBookData] = useState([]);

  const data = useLoaderData();

  useEffect(() => {
    setBookData(data.data);
  }, [data]);

  return (
    <div>
      <Banner />
      <Books books={bookData} />
    </div>
  );
}

export default Home;
