export function fetchData(callback) {
  setTimeout(() => {
    callback("sample data");
  }, 1000);
}
