import { fetchData, badFetchData } from "./promise.js";

describe("fetchData", () => {
  it("should return sample data", () => {
    fetchData().then((data) => {
      expect(data).toBe("sample data");
    });
  });
  //Async/Await
  it("los datos son sample data usando async/await", async () => {
    const data = await fetchData();
    expect(data).toBe("sample data");
  });
});

describe("badFetchData", () => {
  it("should return error", () => {
    badFetchData().catch((error) => {
      // con toEqual (pasandole el objeto)
      expect(error).toEqual(new Error("Error in promise"));
      //con toBe ()
      expect(error.message).toBe("Error in promise");
    });
  });

  it("should toEqual return error async/await", async () => {
    await expect(badFetchData()).rejects.toEqual(new Error("Error in promise"));
  });
});
