// Ejemplo de test con Node vs 'sample.test.js' --> que sería con JEST

import assert from "assert";
import test, { it, describe } from "node:test";
import { add } from "./sample.js";

describe("function add(1,2)", () => {
    test("return 3, botn numbers sum", () => {
        assert.equal(add(1, 2), 3);
    });
    test("return  ");
}); //test suites

