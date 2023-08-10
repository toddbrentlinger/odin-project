import reverseString from "./reverseString";

test('Normal string (length > 1)', () => {
    expect(reverseString('abc')).toBe('cba');
});

test('Normal string (length === 1)', () => {
    expect(reverseString('a')).toBe('a');
});

test('Zero length string', () => {
    expect(reverseString('')).toBe('');
});

test('Blank string (non-zero length)', () => {
    expect(reverseString(' ')).toBe(' ');
});

test('Non-string', () => {
    expect(() => reverseString(0)).toThrow();
    expect(() => reverseString(0)).toThrow(Error);
});
