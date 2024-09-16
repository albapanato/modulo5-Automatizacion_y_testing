// 1 **Test de una función asíncrona**: Crea una función asíncrona que reciba un número y devuelva una promesa que resuelva con el doble de ese número. Testa la función utilizando Jest.

export const doubleUp = async (num) => {
  return new Promise((resolve, reject) => {
    if (typeof num !== "number") {
      reject(new Error("The argument is not a number"));
    }
    resolve(num * 2);
  });
};
