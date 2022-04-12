'use strict';

(function() {
    const calculator = {
        // Properties

        _displayValue: '0',
        _inputOperand: '',
        _inputOperator: '',
        _displayNode: document.getElementById('calc-display-value'),

        // Getter/Setter

        get displayValue() { return this._displayValue; },
        set displayValue(str) {
            if (isNaN(str) && str !== '.') return;
            this._inputOperand = +str;
            this._displayValue = str;
            this._displayNode.textContent = this.displayValue;
            console.log(`Operand set to: ${this._inputOperand}`);
        },

        get inputOperator() { return this._inputOperator; },
        set inputOperator(val) {
            this._inputOperator = val;
            console.log(`Operator set to: ${this._inputOperator}`);
        },

        // Methods

        init() {
            const calcNode = document.getElementById('calculator');

            // Add event listeners
            // Operators
            document.querySelectorAll('#calc-operators-basic .operator-basic')
                .forEach(operatorNode => {
                    operatorNode.addEventListener('click', this.handleOperatorClick.bind(this));
                });
            // Operands
            document.querySelectorAll('#calc-operands .operand')
                .forEach(operandNode => {
                operandNode.addEventListener('click', this.handleOperandClick.bind(this));
            });
            // Other Buttons
        },

        handleOperandClick(e) {
            this.displayValue = e.target.textContent;
        },

        handleOperatorClick(e) {
            this.inputOperator = e.target.dataset.operator;
        },

        /**
         * 
         * @param {String} operator 
         * @param {Number} operand1 
         * @param {Number} operand2 
         */
        operate(operator, operand1, operand2) {
            switch(operator) {
                case 'add':
                    this.add(operand1, operand2);
                    break;
                case 'subtract':
                    this.subtract(operand1, operand2);
                    break;
                case 'multiply':
                    this.multiply(operand1, operand2);
                    break;
                case 'divide':
                    this.divide(operand1, operand2);
                    break;
                default:
            }
        },

        add(num1, num2) {
            return num1 + num2;
        },

        subtract(num1, num2) {
            return num1 - num2;
        },

        multiply(num1, num2) {
            return num1 * num2;
        },

        divide(num1, num2) {
            // Check if dividing by 0
            if (num2 === 0)

            return num1 / num2;
        },
    }.init();
})();