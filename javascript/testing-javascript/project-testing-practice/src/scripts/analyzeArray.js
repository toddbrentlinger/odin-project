function analyzeArray(arr) {
    return {
        average: arr.reduce((accum, curr) => accum + curr) / arr.length,
        min: arr.reduce((prev, curr) => curr < prev ? curr : prev),
        max: arr.reduce((prev, curr) => curr > prev ? curr : prev),
        length: arr.length,
    };
}

export default analyzeArray;
