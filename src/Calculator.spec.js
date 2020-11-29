const { default: Calculator, generateRandomValue } = require("./Calculator");

/*
 * Let's pretend that ./Calculator is an external module and we can't edit it
 * I set it up to look like Webpack compiled import/export statements
 */

jest.useFakeTimers();

jest.mock("./Calculator", () => ({
  // Keep everything as originally implemented
  ...jest.requireActual("./Calculator"),

  // Except for this named export that we mock
  generateRandomValue: () => 15
}));

describe("Calculator", () => {
  it("Adds numbers (basic test)", () => {
    const calc = new Calculator();

    calc.add(5);

    expect(calc.result).toBe(5);
  });

  it("Adds numbers after a timeout (timeout test)", () => {
    const calc = new Calculator();

    calc.addLater(5);

    jest.runAllTimers();

    expect(calc.result).toBe(5);
  });

  it("Adds random numbers (mock test)", () => {
    const calc = new Calculator();

    calc.addRandom();

    expect(calc.result).toBe(15);
  });

  it("Adds the result of a callback (toBeCalled vs toHaveBeenCalled)", () => {
    const calc = new Calculator();
    const callback = jest.fn().mockReturnValue(20);

    calc.addCallbackResult(callback);

    expect(calc.result).toBe(20);

    // These two are identical
    // They check that callback was already called in the past
    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalled();
  });
});
