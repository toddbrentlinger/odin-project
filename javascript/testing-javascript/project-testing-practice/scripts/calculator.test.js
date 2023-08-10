import calculator from "./calculator";

test('Add integers', () => {
    expect(calculator.add(2, 3)).toBe(5);
});

test('Add floating point numbers', () => {
    expect(calculator.add(0.1, 0.2)).toBeCloseTo(0.3);
});

test('Subtract integers', () => {
    expect(calculator.subtract(3, 2)).toBe(1);
});

test('Subtract floating point numbers', () => {
    expect(calculator.subtract(0.3, 0.2)).toBeCloseTo(0.1);
});

test('Divide integers', () => {
    expect(calculator.divide(1,2)).toBeCloseTo(0.5);
});

test('Divide floating point numbers', () => {
    expect(calculator.divide(0.6, 0.2)).toBeCloseTo(3);
});

test('Divide by zero', () => {
    expect(calculator.divide(5, 0)).toBe(Infinity);
});

test('Multiply integers', () => {
    expect(calculator.multiply(2, 3)).toBe(6);
});

test('Multiply floating point numbers', () => {
    expect(calculator.multiply(0.2, 0.3)).toBeCloseTo(0.06);
});