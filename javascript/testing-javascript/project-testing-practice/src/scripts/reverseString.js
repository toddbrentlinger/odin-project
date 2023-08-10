function reverseString(str) {
    if (typeof(str) !== 'string') {
        throw new Error('Input is NOT a string and cannot be reversed!')
    }

    return str.split('').reverse().join('');
}

export default reverseString;
