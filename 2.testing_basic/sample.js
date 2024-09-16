export const add = (a, b) => {
    if (typeof a !== "number" || typeof b !== "number") {
        return console.log(`strings can´t be sum`);
    }

    return a + b;
};

