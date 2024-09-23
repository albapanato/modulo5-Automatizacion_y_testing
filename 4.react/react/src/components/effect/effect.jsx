import { useState } from "react";

export function Effect() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1"
    );
    const json = await response.json();
    setData(json);
  };

  return (
    <div>
      <button onClick={fetchData}>Obtener datos</button>
      {data && <p>{data.title}</p>}
    </div>
  );
}
