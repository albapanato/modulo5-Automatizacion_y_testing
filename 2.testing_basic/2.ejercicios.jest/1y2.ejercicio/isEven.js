// 1. Crea una función `isEven` que recibe un número entero positivo y devuelve `true` si es par y `false` en caso contrario. Crea los test unitarios para la función `isEven` siguiendo la metodología TDD.

// 2. Crea una función `isPrime` que recibe un número entero positivo y devuelve `true` si es un número primo y `false` en caso contrario. Crea los test unitarios para la función `isPrime` siguiendo la metodología TDD.

// export const isEven = (a) => {
// Dos formas diferentes de obtener el mismo resultado:
// Forma 1 //   return num % 2 === 0 // modulo de 2 sera resto 0, expresion para expresar numeros pares
// Forma 2 //   podemos tambien expresarlo asi:
//   return Boolean(num%2); un valor boleano, pero así dará fallo, hay que poner el contrario donde 0 es true y 1 es false. Por lo que sera:
//   return !(num % 2)

// Estos dos caso servirian para par o impar, pero no si le pasamos un string, undefined, null. Asi que integraremos mas logica para cubrir todos los campos: PAR, IMPAR Y NULL

// Para eso integramos:
// if (typeof num !== "number" || num < 0 || num % 1 !== 0) {
//     return null;
// }

// };

//Refactorizacion de este código. Ver clase 04.09.2024

export const isNatural = (num) => {
  if (typeof num !== "number" || num < 0 || num % 1 !== 0) {
    return false;
  }
  return true;
};

//1.SOLUCION EJERCICIO 1//
export const isEven = (a) => {
  // En esta funcion se puede expresar :
  //   if (!isNatural(a)) {
  //     return null;
  //   }
  //   return a % 2 === 0;

  // O con el operador ternario: ( Menos lineas de código)
  return !isNatural(a) ? null : a % 2 === 0;
  // return isNatural(a) ? a % 2 === 0 : null; -> lo mismo pero planteado del reves:
  // return si es un numero natural ? devuelveme true : si no null ;
};

//2.SOLUCION EJERCICIO 2//
export const isPrime = (num) => {
  if (!isNatural(num)) {
    throw new Error("El numero no es un numero natural");
  }
  if (num === 1 || num === 0) {
    return false;
  }
};
