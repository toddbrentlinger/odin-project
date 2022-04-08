const fibonacci = function(count) {
    // Convert to number if string
    if (typeof count === 'string')
        count = +count;

    // Check for non-numbers AND negatives
    if (isNaN(count) || count < 0) return 'OOPS'; 

    let curr = 1;
    let prev = 0;
    let temp;
    for (let i = 1; i < count; i++) {
        temp = curr;
        curr += prev;
        prev = temp;
    }
    return curr;
};

// Do not edit below this line
module.exports = fibonacci;
