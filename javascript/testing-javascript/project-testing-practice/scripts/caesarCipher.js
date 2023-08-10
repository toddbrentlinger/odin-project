function getShiftedCharCodeWithWrap(charCode, shiftFactor, min = 97, max = 122) {
    // Shift lowercase character a-z. Initial char code should be between min-max.

    // If initial char code is NOT between min/max, throw error
    if (charCode < min || charCode > max) {
        throw new Error('Initial char code must be between min and max values!');
    }

    do {
        charCode += shiftFactor;

        // If char code shifted to less than min
        if (charCode < min) {
            // Adjust shift factor
            shiftFactor = min - charCode - 1;

            // Wrap char code around to max
            charCode = max;

        } 
        // Else if char code shifted to more than max
        else if (charCode > max) {
            // Adjust shift factor
            shiftFactor = charCode - max - 1;

            // Wrap char code around to min
            charCode = min;
        }
        // Else char code has finished shifting within min/max 
        else {
            shiftFactor = 0;
        }
    } while (shiftFactor !== 0);

    return charCode;
}

function shiftCharacter(char, shiftFactor) {
    // Return char unchanged if not a-zA-Z
    if (!char.match(/[a-zA-Z]/)) { return char; }

    // Set is uppercase flag
    const isUppercase = char.toUpperCase() === char;

    // Convert to lowercase, if uppercase
    if (isUppercase) {
        char = char.toLowerCase();
    }

    const shiftedCharCode = getShiftedCharCodeWithWrap(char.charCodeAt(0), shiftFactor);

    // Convert char code to character
    char = String.fromCharCode(shiftedCharCode);

    // Return shifted character, converting to uppercase if necessary
    return isUppercase ? char.toUpperCase() : char;
}

function caesarCipher(str, shiftFactor = 1) {
    let convertedStr = '';
    
    for (const char of str.split('')) {
        convertedStr += shiftCharacter(char, shiftFactor);
    }

    return convertedStr;
}

export default caesarCipher;
