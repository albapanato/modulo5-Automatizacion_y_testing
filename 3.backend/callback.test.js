import { fetchData } from "./callback";

test("los datos son sample data", (done) => {
  function callback(data) {
    expect(data).toBe("sample data");
    done();
  }
  fetchData(callback);
});
