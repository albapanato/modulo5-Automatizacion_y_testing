import { factorial } from "./factorial";

describe("factorial", () => {
  //   it("should return 1 if the argument is 0", () => {
  //     expect(factorial(0)).toBe(1);
  //   });
  //   it("should return 1 if the argument is 1", () => {
  //     expect(factorial(1)).toBe(1);
  //   });
  //   it("should return 120 if the argument is 5", () => {
  //     expect(factorial(5)).toBe(120);
  //   });
  //   it("should return 3628800 if the argument is 10", () => {
  //     expect(factorial(10)).toBe(3_628_800);
  //   });
  //   it("should return 2432902008176640000 if the argument is 20", () => {
  //     expect(factorial(20)).toBe(2_432_902_008_176_640_000);
  //   });

  // Cuando hay que producir muchas lineas de código, se puede mejorar de la siguiente manera:

  // // 1 // Almacenando los posibles casos en una constante case, que seria una array de arrays.
  const cases = [
    [0, 1],
    [1, 1],
    [5, 120],
    [10, 3_628_800],
    [20, 2_432_902_008_176_640_000],
  ];
  // // y con el metodo .each, recorrer cases, del cual por cada array, hará un test.
  // en este caso al ser un array para indicar que diga la clave y el valorExpected se pone %s o %d
  // --> NOTA: si es un array de string, %d no funcionaria.
  //   Diferencia clave:
  // %i: Se utiliza para interpolar números enteros. Convierte el valor a un entero si es necesario (por ejemplo, convierte 5.67 a 5).
  // %s: Es más flexible y funcionará en la mayoría de los casos, ya que convierte cualquier valor a cadena.
  // %d: Está destinado solo a números, por lo que garantiza que los valores sean interpretados como números. Si hay algún valor que no sea numérico, podrías obtener un NaN o un error.

  it.each(cases)(
    "should return %i if the arguments is %i", // prueba, en este caso todos funcionand %s, %d y i%.
    (clave, valorExpected) => {
      // le pasamos dos parametros que seran los
      expect(factorial(clave)).toBe(valorExpected);
    }
  );

  // // 2 // Almacenando los posibles casos en una constante objectCases, que seria una array de objetos.

  //   const objectCases = [
  //     { input: 0, expected: 1 },
  //     { input: 1, expected: 1 },
  //     { input: 5, expected: 120 },
  //     { input: 10, expected: 3_628_800 },
  //     { input: 20, expected: 2_432_902_008_176_640_000 },
  //   ];

  // // y con el metodo .each, recorrer objectCases, del cual por cada objeto del array de objetos, hará un test.
  // // $input y $expected se usa cuando estás trabajando con objetos, donde los valores son accesibles por su nombre de propiedad.

  //   it.each(objectCases)(
  //     "should return $expected if the arguments is $input",
  //     ({ input, expected }) => {
  //       expect(factorial(input)).toBe(expected);
  //     }
  //   );
});
