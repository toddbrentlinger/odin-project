const repeatString = function(string, num) {
    // Check for negative numbers
    if (num < 0) return 'ERROR';

    // Append string num times to self
    let outputStr = ''
    for (let i = 0; i < num; i++) {
        outputStr += string;
    }
    
    return outputStr;
};

// Do not edit below this line
module.exports = repeatString;
