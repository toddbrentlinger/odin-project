'use strict';

/*
Input Output
	    0	prev=null curr=null operator=null display='0'=prev?
  2	    2	prev=null curr='2'  operator=null display='2'=curr
  x	    2	prev=2    curr=null operator='x'  display='2'=prev
  6	    6	prev=2	  curr='6'  operator='x'  display='6'=curr
  +	    12      prev=12   curr=null operator='+'  display='12'=prev
  3	    3	prev=12	  curr='3'  operator='+'  display='3'=curr
  =	    15	prev=15	  curr=null operator=null display='15'=prev
  ... 
  .	    0.	prev=15	  curr='0.'  operator=null display='0.'=curr
  2	    0.2	prev=15	  curr='0.2' operator=null display='0.2'=curr
  x	    0.2	prev=0.2  curr=null  operator='x'  display='0.2'=prev
  3	    3	prev=0.2  curr='3'   operator='x'  display='3'=curr
  +	    0.6	prev=0.6  curr=null  operator='+'  display='0.6'=prev
  5	    5	prev=0.6  curr='5'   operator='+'  display='5'=curr
  =	    5.6	prev=5.6  curr=null  operator=null display='5.6'=prev
  ... 
  -	    15	prev=15	  curr=null operator='-'  display='15'=prev
  1	    1	prev=15	  curr='1'  operator='-'  display='1'=curr
  0	    10	prev=15	  curr='10' operator='-'  display='10'=curr
  =	    5	prev=5	  curr=null operator=null display='5'=prev
  ... 
  2	    2	prev=15   curr='2'  operator=null display='2'=curr
  x	    2	prev=2	  curr=null operator='x'  display='2'=prev
  3	    3	prev=2	  curr='3'  operator='x'  display='3'=curr
  =	    6	prev=6    curr=null operator=null display='6'=prev

Operator select(newOp)
  If previous operator === null
    If prev is null AND curr is NOT null
      Set prev = curr
  Else previous operator is NOT null, perform operation with prev and curr
    result = operate(prev operator, prev, curr)
    Set prev = result
  Reset curr = null
  Set operator = newOp
  Set display = prev

Operand select(n)
  If curr === null OR curr === '0'
    If n === '.'
      curr = '0.'
    Else n is a number
    	Set curr to n
  Else curr is NOT null AND NOT '0'
    If n is '.' AND curr already contains '.'
      return
    Append n to curr
  Set display = curr 
*/

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
                if (e.currentTarget.dataset.operand === '.')
                    this._currOperand = '0.';
                else
                    this._currOperand = e.currentTarget.dataset.operand;
            } else {
                if (e.currentTarget.dataset.operand === '.' && this._currOperand.includes('.'))
                    return;
                this._currOperand += e.currentTarget.dataset.operand;
            }
            this.setDisplayText(this._currOperand);

            console.log(`prev: ${this._prevOperand} - curr: ${this._currOperand} - operator: ${this._inputOperator}`);
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
            this._inputOperator = e.currentTarget.dataset.operator !== 'equal' ? e.currentTarget.dataset.operator : null; 
            this._currOperand = null;
            this.setDisplayText(this._prevOperand);

            console.log(`prev: ${this._prevOperand} - curr: ${this._currOperand} - operator: ${this._inputOperator}`);
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