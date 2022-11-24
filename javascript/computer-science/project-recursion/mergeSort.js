function mergeSort(arr)  {
    if (arr.length > 1) {
        // Sort each half sub-array recursively
        let iArr = Math.floor(arr.length / 2);
        let leftArr = mergeSort(arr.slice(0, iArr));
        let rightArr = mergeSort(arr.slice(iArr));

        // Merge sorted arrays into one
        iArr = 0;
        let iLeft = 0, iRight = 0;

        /** If left array value less than right array value, assign left array 
         * index value to final array and increment left index.
         * Else assign right array index value to final array and increment 
         * right index.
         * In both cases, increment final array index after assignment.
         */
        while (iLeft < leftArr.length && iRight < rightArr.length) {
            arr[iArr++] = leftArr[iLeft] < rightArr[iRight] 
                ? leftArr[iLeft++] 
                : rightArr[iRight++];
        }

        /** If any left array values left, add to end of final array. If any 
         * right array values left, add to end of final array. NOTE: After 
         * while loop, only left OR right array should have values left, NOT 
         * both.
         */
        if (iLeft < leftArr.length) {
            while (iLeft < leftArr.length)
                arr[iArr++] = leftArr[iLeft++]
        }
        if (iRight < rightArr.length) {
            while (iRight < rightArr.length)
                arr[iArr++] = rightArr[iRight++];
        }
    }
    
    return arr;
}

function mergeSortOld(arr) {
    if (arr.length > 1) {
        // Sort each half sub-array recursively
        let iArr = Math.floor(arr.length / 2);
        let leftArr = mergeSortOld(arr.slice(0, iArr));
        let rightArr = mergeSortOld(arr.slice(iArr));

        // Merge sorted arrays into one
        iArr = 0;
        let iLeft = 0, iRight = 0;
        
        // Loop through each index of initial array arr
        while ((iLeft + iRight) < arr.length) {
            // If right array does NOT have values left to check
            // OR left array does have values left to check AND left array value less than right array value
            // assign left array index value to final array. Increment left index AND final array index.
            if (!(iRight < rightArr.length) || (iLeft < leftArr.length && leftArr[iLeft] < rightArr[iRight]))
                arr[iArr++] = leftArr[iLeft++];
            // Else assign right array index value to final array and increment right index AND final array index.
            else 
                arr[iArr++] = rightArr[iRight++];
        }

    }

    return arr;
}

// Testing

console.assert(areArraysEqual(mergeSort([]), []));
console.assert(areArraysEqual(mergeSort([1]), [1]));
console.assert(areArraysEqual(mergeSort([1,2]), [1,2]));
console.assert(areArraysEqual(mergeSort([2,1]), [1,2]));
console.assert(areArraysEqual(mergeSort([1,2,3]), [1,2,3]));
console.assert(areArraysEqual(mergeSort([3,2,1]), [1,2,3]));
console.assert(areArraysEqual(mergeSort([4,2,5,1,3]), [1,2,3,4,5]));
console.assert(areArraysEqual(mergeSort([4,2,2,1,3]), [1,2,2,3,4]));
console.assert(areArraysEqual(mergeSort([1,1,1]), [1,1,1]));

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
