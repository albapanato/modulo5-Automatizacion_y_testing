export function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("sample data");
    }, 1000);
  });
}

export function badFetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("Error in promise"));
    }, 1000);
  });
}
