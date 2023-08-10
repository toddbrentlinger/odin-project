import caesarCipher from "./caesarCipher";

test('No-wrap', () => {
    expect(caesarCipher('defend the east wall of the castle', 1))
        .toBe('efgfoe uif fbtu xbmm pg uif dbtumf');
});

test('Wrap', () => {
    expect(caesarCipher('abcdefghijklmnopqrstuvwxyz', 1))
        .toBe('bcdefghijklmnopqrstuvwxyza');
    
    expect(caesarCipher('abcdefghijklmnopqrstuvwxyz', 10))
        .toBe('klmnopqrstuvwxyzabcdefghij');
});

test('Keep the same case', () => {
    expect(caesarCipher('Defend the eAst waLl of thE castlE', 1))
        .toBe('Efgfoe uif fBtu xbMm pg uiF dbtumF');
});

test('Punctuation', () => {
    expect(caesarCipher('Defend. The east wall, of the castle!', 1))
        .toBe('Efgfoe. Uif fbtu xbmm, pg uif dbtumf!');
});

test('Shift factor greater than 26', () => {
    expect(caesarCipher('abcdefghijklmnopqrstuvwxyz', 27))
        .toBe('bcdefghijklmnopqrstuvwxyza');
});