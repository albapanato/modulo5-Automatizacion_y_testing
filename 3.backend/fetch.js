const url = "https://jsonplaceholder.typicode.com/todos/1";

// fetch promises
// export const getData = () => {
//   fetch(url)
//     .then((response) => response.json())
//     .then((json) => console.log(json))
//     .catch((error) => console.log(error));
// };

// fetch utilizando la libreria axios

import axios from "axios";
export const getDataByAxios = async () => {
  try {
    const response = await axios.get(url);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error.message);
  }
};
