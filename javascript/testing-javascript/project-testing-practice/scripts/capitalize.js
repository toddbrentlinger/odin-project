function capitalize(str) {
    if (typeof(str) !== 'string') {
        throw new Error('Input is NOT a string and cannot be capitalized!');
    }

    if (str.length === 0) { return str; }

    return str[0].toUpperCase() + str.slice(1);
}

export default capitalize;