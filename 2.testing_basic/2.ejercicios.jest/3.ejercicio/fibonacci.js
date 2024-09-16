// 3. Crea una función `fibonacci` que recibe un número entero positivo y devuelve el número de la serie de Fibonacci correspondiente. Crea los test unitarios para la función `fibonacci` siguiendo la metodología TDD.

export function fibonacci(n) {
  // Verificar que n es un entero positivo
  if (n <= 0) {
    throw new Error("El número debe ser un entero positivo");
  }

  // Casos base
  if (n === 1) {
    return 0;
  } else if (n === 2) {
    return 1;
  }

  // Inicializar los primeros dos números de la serie
  let a = 0,
    b = 1,
    c;

  // Calcular el número de Fibonacci en la posición n
  for (let i = 3; i <= n; i++) {
    c = a + b;
    a = b;
    b = c;
  }

  return b;
}
