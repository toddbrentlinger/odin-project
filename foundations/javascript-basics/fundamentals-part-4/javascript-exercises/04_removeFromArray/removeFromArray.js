const removeFromArray = function() {
    // arguments[0] - array
    // arguments[1,2,3,...,n] - values to remove
    const args = Array.from(arguments);
    // For each value to remove, filter array
    for (let i = 1; i < args.length; i++) {
        args[0] = args[0].filter(arrayItem => arrayItem !== args[i]);
    }
    // Return only filtered array
    return args[0];
};

// Do not edit below this line
module.exports = removeFromArray;
