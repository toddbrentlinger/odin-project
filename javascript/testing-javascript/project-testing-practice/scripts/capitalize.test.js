import capitalize from "./capitalize";

test('Lower-case string', () => {
    expect(capitalize('lower')).toBe('Lower');
});

test('Upper-case string', () => {
    expect(capitalize('Upper')).toBe('Upper');
});

test('Zero length string', () => {
    expect(capitalize('')).toBe('');
});

test('Blank string (non-zero length)', () => {
    expect(capitalize(' ')).toBe(' ');
});

test('Non-string', () => {
    expect(() => capitalize(0)).toThrow();
    expect(() => capitalize(0)).toThrow(Error);
});
