import { useLoaderData } from "react-router";

function Authors() {
  const data = useLoaderData();
  console.log(data.data.authors);
  // const useEffect = ()=>{
  //   setAuthors[data]
  // }
  return <div>{console.log(data)}</div>;
}

export default Authors;
