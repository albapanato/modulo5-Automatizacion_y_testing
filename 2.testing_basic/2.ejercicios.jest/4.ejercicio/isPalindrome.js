// 4. Crea una función `isPalindrome` que recibe una cadena de texto y devuelve `true` si es un palíndromo y `false` en caso contrario. Crea los test unitarios para la función `isPalindrome` siguiendo la metodología TDD.

export function isPalindrome(input) {
  //convertir input a string
  const subject = input.toString();

  const textClear = subject
    .toLowerCase()
    .replace(/[áàäâ]/g, "a")
    .replace(/[éèëê]/g, "e")
    .replace(/[íìïî]/g, "i")
    .replace(/[óòöô]/g, "o")
    .replace(/[úùüû]/g, "u")
    .replace(/[^a-z0-9]/g, ""); // Remover caracteres que no sean letras o números

  // Comparar la cadena limpia con su reverso
  const textReverse = textClear.split("").reverse().join("");

  return textClear === textReverse;
}
