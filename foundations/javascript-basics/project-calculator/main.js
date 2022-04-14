'use strict';

(function() {
    const calculator = {
        // Properties

        _prevOperand: null,
        _currOperand: '0',
        _inputOperator: null,
        _displayNode: document.getElementById('calc-display-value'),

        // Getter/Setter

        get prevOperand() {
            return this._prevOperand;
        },
        set prevOperand(num) {
            // If num is NOT a number, return
            if (isNaN(num)) return;
            // If num is a string, convert to number
            if (typeof num === 'string')
                num = +num;
            // Num should be a number if reach this point
            this._prevOperand = num;
            console.log(`Prev Operand set to: ${this._prevOperand}`);
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
            document.getElementById('clear-btn')
                .addEventListener('click', this.handleClearClick.bind(this));
        },

        handleOperandClick(e) {
            if (this._currOperand === null || this._currOperand === '0') {
                if (e.target.textContent === '.')
                    this._currOperand = '0.';
                else
                    this._currOperand = e.target.textContent;
            } else {
                if (e.target.textContent === '.' && this._currOperand.includes('.'))
                    return;
                this._currOperand += e.target.textContent;
            }
            this.setDisplayText(this._currOperand);

            console.log(`prev: ${this._prevOperand} - curr: ${this._currOperand} - operator: ${this._inputOperator} - display: ${this._displayValue}`);
        },

        handleOperatorClick(e) {
            if (this._inputOperator === null) {
                if (this._prevOperand === null && this._currOperand !== null)
                    this.prevOperand = this._currOperand;
            } else {
                const result = this.operate(this._inputOperator, this.prevOperand, this._currOperand);
                if (result === undefined) return;
                this.prevOperand = result;
            }
            this._inputOperator = e.target.dataset.operator !== 'equal' ? e.target.dataset.operator : null; 
            this._currOperand = null;
            this.setDisplayText(this._prevOperand);

            console.log(`prev: ${this._prevOperand} - curr: ${this._currOperand} - operator: ${this._inputOperator} - display: ${this._displayValue}`);
        },

        /** Resets calculator to default state. */
        handleClearClick() {
            this._prevOperand = null;
            this._currOperand = '0';
            this._inputOperator = null;
            this.setDisplayText(this._currOperand);
        },

        /**
         * Performs operation with operator and two operands. Returns the result or undefined.
         * @param {String} operator 
         * @param {Number} operand1 
         * @param {Number} operand2 
         * @return {Number|undefined} Result of operation or undefined.
         */
        operate(operator, operand1, operand2) {
            // Ensure each operand is a number
            if (isNaN(operand1) || isNaN(operand2)) return;

            // If operand is a string, convert to a number
            if (typeof operand1 === 'string')
                operand1 = +operand1;
            if (typeof operand2 === 'string')
                operand2 = +operand2;

            switch(operator) {
                case 'plus':
                    return this.add(operand1, operand2);
                case 'minus':
                    return this.subtract(operand1, operand2);
                case 'multiply':
                    return this.multiply(operand1, operand2);
                case 'divide':
                    return this.divide(operand1, operand2);
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
            if (num2 === 0){
                this.setDisplayText('Cannot divide by 0');
                return;
            }

            return num1 / num2;
        },
        
        /**
         * Sets calculator display text.
         * @param {String|Number} newText 
         */
        setDisplayText(newText) {
            this._displayNode.textContent = newText;
        }
    }.init();
})();