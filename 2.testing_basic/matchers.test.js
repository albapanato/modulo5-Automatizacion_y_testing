describe("Matchers de igualdad y veracidad", () => {
  it("toBe", () => {
    expect(1 + 2).toBe(3);
  });
  it("toEqual", () => {
    expect({ a: 1 }).toEqual({ a: 1 });
  });
  it("toBeNull", () => {
    expect(null).toBeNull(); // === toBe(null)
  });
  it("toBeUndefined", () => {
    expect(undefined).toBeUndefined();
  });
  it("toBeDefined", () => {
    expect(1).toBeDefined();
  });
  it("toBeTruthy", () => {
    expect(true).toBeTruthy();
  });
  it("toBeFalsy", () => {
    expect(false).toBeFalsy(); // false, 0 -0, '' , null, undefined, NaN
  });
});

describe("Matchers de comparación de números", () => {
  it("toBeGreaterThan", () => {
    expect(3).toBeGreaterThan(2);
  });
  it("toBeGreaterThanOrEqual", () => {
    expect(3).toBeGreaterThanOrEqual(3);
  });
  it("toBeLessThan", () => {
    expect(2).toBeLessThan(3);
  });
  it("toBeLessThanOrEqual", () => {
    expect(2).toBeLessThanOrEqual(2);
  });
  it("toBeCloseTo", () => {
    expect(0.1 + 0.2).toBeCloseTo(0.3);
  });
});

describe("Matchers de comparación de otros tipos de valores", () => {
  it("toBeInstanceOf", () => {
    expect(new Date()).toBeInstanceOf(Date);
  });
  it("toMatch", () => {
    expect("abc").toMatch(/a/);
  });
  it("toContain", () => {
    expect([1, 2, 3]).toContain(2);
  });
  it("toHaveLength", () => {
    expect("abc").toHaveLength(3);
  });
});
