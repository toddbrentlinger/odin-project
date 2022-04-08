const add = function(a, b) {
	return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const sum = function(arr) {
	return arr.reduce((sum, num) => sum + num, 0);
};

const multiply = function(arr) {
  return arr.reduce((total, num) => total * num);
};

const power = function(a, b) {
	return a**b;
};

const factorial = function(num) {
  return Array.from(Array(num).keys())
    .reduce((factorial, i) => factorial * (i + 1), 1);

	// let factorial = 1;
  // for (let i = 2; i <= num; i++)
  //   factorial *= i;
  // return factorial;
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};
