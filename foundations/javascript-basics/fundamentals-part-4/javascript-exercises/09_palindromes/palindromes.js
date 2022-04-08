const palindromes = function (str) {
    // Convert to uppercase
    // Remove punctuation
    str = str.toUpperCase().match(/\w/g);

    // Move toward center from start and end, comparing each character
    let start = 0;
    let end = str.length - 1;
    while (start <= end) {
        // If characters do NOT match, NOT a palindrome
        // Increment start and decrement end for next loop
        if (str[start++] !== str[end--])
            return false;
    }
    // If reach here, is palindrome
    return true;
};

// Do not edit below this line
module.exports = palindromes;
