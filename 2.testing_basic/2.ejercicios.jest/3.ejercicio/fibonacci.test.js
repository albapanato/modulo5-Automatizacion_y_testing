import { fibonacci } from "./fibonacci";

describe("Checking fibonacci arguments", () => {
  // --> Asegurando que no hay falsos positivos:

  //   test("forcing an error to discard falsy positive", () => {
  //     expect(fibonacci(8)).toBe(34);
  //   });

  //   test.skip("recive 10 and fibonacci position its 34", () => {
  //     expect(fibonacci(10)).toBe(34);
  //   });
  //   test.skip("recive 1 and fibonacci position its 0", () => {
  //     expect(fibonacci(1)).toBe(0);
  //   });
  //   test.skip("recive 2 and fibonacci position its 1", () => {
  //     expect(fibonacci(2)).toBe(1);
  //   });

  // --> Simplificando los test escritos arriba:
  const cases = [
    [10, 34],
    [1, 0],
    [2, 1],
  ];
  test.each(cases)("recive %s and fibonacci position its %s", (a, b) => {
    expect(fibonacci(a)).toBe(b);
  });

  //--> A la hora de comprobar partes del código que manejan errores, como en el caso siguiente, es necesario meterle una funcion anonima a expect:
  test("should throw error if recive a negative number ", () => {
    expect(() => fibonacci(-1)).toThrow(
      new Error("El número debe ser un entero positivo")
    );
  });

  //--> ¿ POR QUE ES NECESARIO UNA FUNCION ANONIMA ()=> A EXPECT?

  //Si haces el código como lo has hecho de esta manera:
  //   test("should throw error if recive a negative number ", () => {
  //     expect(fibonacci(-1)).toThrow(
  //       new Error("El número debe ser un entero positivo")
  //     );
  //   });

  // fibonacci(-1) ejecuta la función inmediatamente y lanza el error fuera de expect.

  // por lo que si le metemos una funcion anonima es como decirle: "No ejecutes fibonacci(-1) todavía, sólo prepárate para ejecutarla." Luego, lo que expect hace es llamar a esa función cuando llega el momento de verificar si lanza un error. Entonces, expect ya está "atento" cuando la función finalmente se ejecuta y puede verificar si el error ocurre como esperabas.
});
