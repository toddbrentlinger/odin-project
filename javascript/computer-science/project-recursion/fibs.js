function fibs(n) {
    let fibArr = [];
    for (let i = 0; i < n; i++) {
        if (i < 2)
            fibArr.push(i);
        else
            fibArr.push(fibArr[i-1] + fibArr[i-2]);
    }
    return fibArr;
}

function fibsRec(n) {
    return (n > 2) ? [...fibsRec(n-1), fibsRec(n-1)[n-2] + fibsRec(n-1)[n-3]]
        : (n == 2) ? [0, 1]
        : (n == 1) ? [0]
        : [];
}

// Testing

console.log('fibs');
console.assert(areArraysEqual(fibs(-1), []));
console.assert(areArraysEqual(fibs(0), []));
console.assert(areArraysEqual(fibs(1), [0]));
console.assert(areArraysEqual(fibs(2), [0, 1]));
console.assert(areArraysEqual(fibs(3), [0, 1, 1]));
console.assert(areArraysEqual(fibs(4), [0, 1, 1, 2]));
console.assert(areArraysEqual(fibs(8), [0, 1, 1, 2, 3, 5, 8, 13]));

console.log('fibsRec');
console.assert(areArraysEqual(fibsRec(-1), []));
console.assert(areArraysEqual(fibsRec(0), []));
console.assert(areArraysEqual(fibsRec(1), [0]));
console.assert(areArraysEqual(fibsRec(2), [0, 1]));
console.assert(areArraysEqual(fibsRec(3), [0, 1, 1]));
console.assert(areArraysEqual(fibsRec(4), [0, 1, 1, 2]));
console.assert(areArraysEqual(fibsRec(8), [0, 1, 1, 2, 3, 5, 8, 13]));

// Utilities

function areArraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length)
        return false;

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i])
            return false;
    }

    return true;
}

/*
function fibsRec(n) {
    return (n > 2) ? [...fibsRec(n-1), fibsRec(n-1)[n-2] + fibsRec(n-1)[n-3]]
        : (n == 2) ? [0, 1]
        : (n == 1) ? [0]
        : [];
}

*******************************************************************************

Level-1 n=3
[...fibsRec(2), fibsRec(2)[1] + fibsRec(2)[0]]

Level-2 n=2
[0, 1]

Back to Level-1
[...[0, 1], 1 + 0] => [0, 1, 1]

*******************************************************************************

Level-1 n=4
[...fibsRec(3), fibsRec(3)[2] + fibsRec(3)[1]]

Level-2 n=3
[...fibsRec(2), fibsRec(2)[1] + fibsRec(2)[0]]

Level-3 n=2
[0, 1]

Back to Level-2
[...[0, 1], 1 + 0] => [0, 1, 1]

Back to Level-1
[...[0, 1, 1], 1 + 1] => [0, 1, 1, 2]

*******************************************************************************
*/
