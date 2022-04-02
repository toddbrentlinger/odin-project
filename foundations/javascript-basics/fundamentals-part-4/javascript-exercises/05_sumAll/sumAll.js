const sumAll = function(firstNum, secondNum) {
    // Check if either argument is NaN
    if (typeof firstNum !== 'number' || typeof secondNum !== 'number')
        return 'ERROR';

    // Check if either number is negative
    if (firstNum < 0 || secondNum < 0)
        return 'ERROR';
    
    // Check that firstNum is less than secondNum
    if (firstNum > secondNum) {
        let temp = firstNum;
        firstNum = secondNum;
        secondNum = temp;
    }

    let sum = 0;
    for (let i = firstNum; i <= secondNum; i++) {
        sum += i;
    }
    return sum;
};

// Do not edit below this line
module.exports = sumAll;
