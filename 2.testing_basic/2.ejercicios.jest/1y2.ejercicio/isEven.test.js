import { isEven, isPrime } from "./isEven";

describe("isEven", () => {
  it("Checking if the number is even", () => {
    expect(isEven(2)).toBe(true);
  });
  it("Should return true if the argument is 0", () => {
    expect(isEven(0)).toBe(true);
    expect(isEven(2)).toBe(true);
  });
  it("Checking if the number is not even", () => {
    expect(isEven(3)).toBe(false);
  });
  it("Use --> toBeNull <-- checking if the number is null", () => {
    expect(isEven(3.5)).toBeNull();
    expect(isEven(-3)).toBe(null);
    expect(isEven("pepe")).toBe(null);
  });
});

//para que solo ejecute este test, se le agrega .only, y el resto de test se los salta, o .skip para saltar el test
describe("primitives vs references", () => {
  it("Use --> toBe <-- for primitives", () => {
    const a = 20;
    const b = 20;
    expect(a).toBe(b);
  });
  it("Use --> toStricEqual <-- for references", () => {
    const a = {};
    const b = {};
    expect(a).toStrictEqual(b);
  });
});

describe("isPrime", () => {
  it("Use --> toThrow <-- to throw an error if an argument not natural, ", () => {
    //     //Act
    //     const result = () => isPrime(-1);
    //     //Assert
    //     expect(result).toThrow("El numero no es un numero natural");
    // o de esta manera:
    expect(() => isPrime(-1)).toThrow("El numero no es un numero natural");
  });
});
