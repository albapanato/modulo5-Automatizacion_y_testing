import { doubleUp } from "./ejercicio1";

// MOCKEANDO LOS TEST:

jest.mock("./ejercicio1.js", () => ({
  doubleUp: jest.fn((num) => {
    if (typeof num !== "number") {
      return Promise.reject(new Error("The argument is not a number"));
    }
    // Si es un número, resolvemos con el doble del número
    return Promise.resolve(num * 2);
  }), //Creamos un mock para la funcion
}));

describe("mocking", () => {
  it("num = 2, double should be 4", async () => {
    //Esta parte del código sobra, si me traigo la logica de la funcion dentro de fn()
    //doubleUp.mockResolvedValue(4);
    const result = await doubleUp(2);
    expect(result).toBe(4);
    expect(doubleUp).toHaveBeenCalledWith(2);
  });
  it("should return error if the argument is not a number", async () => {
    //Esta parte del código sobra, si me traigo la logica de la funcion dentro de fn()
    // doubleUp.mockRejectedValue(new Error("The argument is not a number"));
    await expect(doubleUp("two")).rejects.toEqual(
      new Error("The argument is not a number")
    );
  });
});

// TEST NORMALES PARA COMPROBAR QUE NUESTRA PROMESA SE RESUELVE:

// describe("checking doubleUp", () => {
//   it("num = 2, double should be 4", async () => {
//     const result = await doubleUp(2);
//     expect(result).toBe(4);
//   });
//   it("should return error if the argument is not a number", async () => {
//     await expect(doubleUp("two")).rejects.toEqual(
//       new Error("The argument is not a number")
//     );
//   });
// });
