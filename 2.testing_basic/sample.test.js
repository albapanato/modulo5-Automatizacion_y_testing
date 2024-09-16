//Ejemplo de test con Jest vs 'sample.node.test.js' --> que sería con Node.

import { add } from "./sample";

describe("testear funcion add", () => {
    //--> describe() va con dos parametros ('primero descripcion', (segundo callback)=>{ lógica a testear })
    it("add 1 + 2 should be 3", () => {
        expect(add(1, 2)).toBe(3);
    });
    it("add 1 + -2 should be -1", () => {
        expect(add(1, -2)).toBe(-1);
    });
}); // test suites

// patrón AAA (Arrange, Act, Assert)

describe("funcion add con patrón AAA", () => {
    it("should return 30", () => {
        //Arrange
        const a = 10;
        const b = 20;
        const ab = 30;
        //Act
        const result = add(a, b);
        //Assert
        expect(result).toBe(ab);
    });
    it("should return 9", () => {
        //Arrange
        const a = 4;
        const b = 5;
        const ab = 9;
        //Act
        const result = add(a, b);
        //Assert
        expect(result).toBe(ab);
    });
    it("should return console.log", () => {
        //Arrange
        const a = "maria";
        const b = "alba";
        const ab = undefined;
        //Act
        const result = add(a, b);
        //Assert
        expect(result).toBe(ab);
    });
});

// Given-When-Then

describe("funcion add con patrón Given-When-Then --> nivel 1", () => {
    describe("Varios niveles de described --> nivel 2", () => {
        const a = 2;
        const b = 5;
        it("más comentarios donde saldria el resultado del test --> nivel 3", () => {
            const ab = 7;
            const operacion = add(a, b);
            expect(operacion).toBe(ab);
        });
    });
});

describe("Given-When-Then --> nivel 1", () => {
    describe("The sum of 2 + 5 --> nivel 2", () => {
        const a = 2;
        const b = 5;
        it("should be 7 --> nivel 3", () => {
            const ab = 7;
            const operacion = add(a, b);
            expect(operacion).toBe(ab);
        });
    });
});

