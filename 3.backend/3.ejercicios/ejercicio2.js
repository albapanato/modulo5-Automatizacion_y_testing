// 2. **Test de una clase**: Crea una clase que represente un círculo, con un método que calcule el área del círculo. Testa la clase utilizando Jest.

export class Circulo {
  constructor(radio) {
    if (radio <= 0) {
      throw new Error("El radio debe ser mayor que cero");
    }
    this.radio = radio;
  }

  // Método para calcular el área del círculo
  calcularArea() {
    return Math.PI * Math.pow(this.radio, 2);
  }
}
