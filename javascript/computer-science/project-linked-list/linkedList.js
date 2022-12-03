class Node {
    /**
     * @constructor
     * @param {*} value 
     */
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
    }

    /**
     * Adds a new node containing value to the end of the list.
     * @param {*} value 
     */
    append(value) {
        // If list is empty, assign head to new node
        if (!this.head) {
            this.head = new Node(value);
        } else {
            let currNode = this.head;
            // Get last node
            while (currNode.next)
                currNode = currNode.next;

            // Assign new node 'next' of last node
            currNode.next = new Node(value);
        }
    }

    /**
     * Adds a new node containing value to the start of the list.
     * @param {*} value 
     */
    prepend(value) {
        const newNode = new Node(value);

        // Assign new node 'next' to initial first node of list
        newNode.next = this.head;

        // Assign head to new node
        this.head = newNode;
    }

    /**
     * Returns the total number of nodes in the list.
     * @returns {Number}
     */
    size() {
        let count = 0;
        let currNode = this.head;

        // Loop through list ending with null, incrementing counter each time
        while (currNode) {
            count++;
            currNode = currNode.next;
        }

        return count;
    }

    /**
     * Returns the last node in the list.
     * @returns {Node|null}
     */
    tail() {
        // Return null if empty list
        if (!this.head)
            return null;

        // Loop through list ending with last node
        let currNode = this.head;
        while (currNode.next) {
            currNode = currNode.next;
        }

        // Return last node
        return currNode;
    }
 
    /**
     * Returns the node at the given index or undefined if not in LinkedList.
     * @param {Number} index
     * @returns {Node|undefined}
     */
    at(index) {
        // Return if empty list
        if (!this.head)
            return undefined;

        let currNode = this.head;

        // Loop through list until reach index-th node OR last node
        while (index > 0 && currNode.next) {
            currNode = currNode.next;
            index--;
        }

        // Return if reached last node without reaching index-th node
        return index > 0 ? undefined : currNode;
    }

    /**
     * Removes, and returns, the last element from the list. Returns null if list is empty.
     * @returns {Node|null}
     */
    pop() {
        // Check if empty list
        if (!this.head)
            return null;

        let currNode = this.head;
        // Check if single Node in list
        if (!this.head.next) {
            this.head = null; // Empty list
            return currNode; // Return first node
        }
        
        // If reach this point, there are 2 or more Nodes in list
        // Loop through list until reach second to last node
        while (currNode.next.next)
            currNode = currNode.next;

        // Save last node to be returned and set second to last node as last node
        let nextNode = currNode.next;
        currNode.next = null;
        return nextNode;
    }

    /**
     * Returns true if the passed in value is in the list and otherwise returns false.
     * @param {*} value 
     * @returns {Boolean}
     */
    contains(value) {
        let currNode = this.head;

        // Loop through list. If find matching value in node, return true.
        while (currNode) {
            if (currNode.value === value)
                return true;
            currNode = currNode.next;
        }

        // If reach this point, no match OR empty list
        return false;
    }

    /**
     * Returns the index of the node containing value, or null if not found.
     * @param {*} value 
     * @returns {Number|null}
     */
    find(value) {
        // Return null is list is empty
        if (!this.head)
            return null;

        let i = 0, currNode = this.head;
        // Loop through list, incrementing index counter each time.
        // If find matching value, return index.
        while (currNode) {
            if (currNode.value === value)
                return i;
            i++;
            currNode = currNode.next;
        }

        // If reach this point, value NOT in list. Return null.
        return null;
    }

    /**
     * Represents the LinkedList object as a string.
     * @returns {String}
     */
    toString() {
        let str = '', currNode = this.head;

        // Loop through list, adding each node's value to string
        while (currNode) {
            str += `( ${currNode.value} ) -> `;
            currNode = currNode.next;
        }

        // Add 'null' to string to represent end of list
        str += 'null';

        return str;
    }

    /**
     * Inserts a new node with the provided value at the given index. If index 
     * exceeds length of list, append at end.
     * @param {*} value 
     * @param {Number} index 
     */
    insertAt(value, index) {
        // Return is index is NOT valid (less than 0)
        if (index < 0) return;

        let newNode = new Node(value);

        // If list is empty, assign head to new node and return
        if (!this.head) {
            this.head = newNode;
            return;
        }

        // If non-zero index
        if (index) {
            let currNode = this.head;

            // Loop through list until reaches node before index-th node OR last node
            while (index > 1 && currNode.next) {
                currNode = currNode.next;
                index--;
            }

            // Once reach this point, currNode is at (index-1) node OR last node
            newNode.next = currNode.next;
            currNode.next = newNode;
        } else { // Else zero index
            // Assign first node to new node's 'next' property
            newNode.next = this.head;

            // Assign head to new node
            this.head = newNode;
        }
    }

    /**
     * Removes the node at the given index and returns it's value. Returns undefined if index out of bounds.
     * @param {Number} index
     * @returns {*}
     * 
     */
    removeAt(index) {
        // Return if list is empty OR index is less than 0
        if (!this.head || index < 0) return;
        
        let currNode;

        // If index is non-zero
        if (index) {
            let prevNode = this.head;
            currNode = this.head.next;
            
            // Loop through list, keeping track of previous node
            while (index > 1 && currNode) {
                prevNode = currNode;
                currNode = currNode.next;
                index--;
            }

            // Return if index larger than size of list OR reached the end of the list
            if (index > 1 || !currNode)
                return;

            // Remove currNode from list
            prevNode.next = currNode.next;

        } else { // Else index is zero
            currNode = this.head;
            this.head = currNode.next;
        }

        return currNode.value;
    }
}

(() => {
    const unitTests = (() => {
        let failedTests = 0;

        function add(title, condition) {
            let str = title + ': ';

            if (condition)
                console.log(str + 'Pass!');
            else
                console.error(str + 'Fail!');
                
            if (!condition)
                failedTests++;
        }

        function createListFromArgs(...args) {
            let llist = new LinkedList();
            let currNode;
            for (const [index, arg] of args.entries()) {
                if (index) { // If index is non-zero
                    currNode.next = new Node(arg);
                    currNode = currNode.next;
                } else { // Else index is zero
                    llist.head = new Node(arg);
                    currNode = llist.head;
                }
            }
            return llist;
        }

        function print() {
            if (failedTests)
                console.error(`${failedTests} test${failedTests > 1 ? 's' : ''} failed!`);
            else
                console.log('All tests passed!');
        }

        return {
            add,
            createListFromArgs,
            print,
        };
    })();
    
    let llistEmpty = unitTests.createListFromArgs(); // Always keep as empty list before new test
    let llistSingle = unitTests.createListFromArgs(0); // Always keep as single node list before test
    let llist = unitTests.createListFromArgs(0,1,2); // Can have any number of nodes before new test

    // toString

    unitTests.add(
        'toString() on empty list', 
        llistEmpty.toString() === 'null'
    );

    unitTests.add(
        'toString() on list with single node',
        llistSingle.toString() === '( 0 ) -> null'
    );

    unitTests.add(
        'toString() on list with more than one node',
        llist.toString() === '( 0 ) -> ( 1 ) -> ( 2 ) -> null'
    );

    // append

    llistEmpty.append(0);
    unitTests.add(
        'append() to empty list',
        llistEmpty.toString() === '( 0 ) -> null'
    );

    llistSingle.append(1);
    unitTests.add(
        'append() to list with single node',
        llistSingle.toString() === '( 0 ) -> ( 1 ) -> null'
    );

    llist.append(3);
    unitTests.add(
        'append() to list with more than one node',
        llist.toString() === '( 0 ) -> ( 1 ) -> ( 2 ) -> ( 3 ) -> null'
    );

    // prepend

    llistEmpty = unitTests.createListFromArgs(); // Always keep as empty list before new test
    llistSingle = unitTests.createListFromArgs(0); // Always keep as single node list before test
    llist = unitTests.createListFromArgs(0,1,2); // Can have any number of nodes before new test

    llistEmpty.prepend(-1);
    unitTests.add(
        'prepend() to empty list',
        llistEmpty.toString() === '( -1 ) -> null'
    );

    llistSingle.prepend(-1);
    unitTests.add(
        'prepend() to list with single node',
        llistSingle.toString() === '( -1 ) -> ( 0 ) -> null'
    );

    llist.prepend(-1);
    unitTests.add(
        'prepend() to list with more than one node',
        llist.toString() === '( -1 ) -> ( 0 ) -> ( 1 ) -> ( 2 ) -> null'
    );

    // size

    llistEmpty = unitTests.createListFromArgs(); // Always keep as empty list before new test
    llistSingle = unitTests.createListFromArgs(0); // Always keep as single node list before test
    llist = unitTests.createListFromArgs(0,1,2); // Can have any number of nodes before new test

    unitTests.add(
        'size() of empty list',
        llistEmpty.size() === 0
    );

    unitTests.add(
        'size() of list with single node',
        llistSingle.size() === 1
    );

    unitTests.add(
        'size() of list with more than one node',
        llist.size() === 3
    );

    // tail

    unitTests.add(
        'tail() of empty list',
        llistEmpty.tail() === null
    );

    unitTests.add(
        'tail() of list with single node',
        llistSingle.tail().value === 0
    );

    unitTests.add(
        'tail() of list with more than one node',
        llist.tail().value === 2
    );

    // at

    unitTests.add(
        'at() of empty list',
        llistEmpty.at(0) === undefined
    );

    unitTests.add(
        'at() of first node in list',
        llist.at(0).value === 0
    );

    unitTests.add(
        'at() of middle node in list',
        llist.at(1).value === 1
    );

    unitTests.add(
        'at() of last node in list',
        llist.at(2).value === 2
    );

    unitTests.add(
        'at() of one index past end of list',
        llist.at(3) === undefined
    );

    unitTests.add(
        'at() of more than one index past end of list',
        llist.at(4) === undefined
    );

    // pop

    unitTests.add(
        'pop() on empty list',
        llistEmpty.pop() === null
    );

    unitTests.add(
        'pop() on list with single node',
        llistSingle.pop().value === 0
    );

    unitTests.add(
        'check list with single node had last node removed',
        llistSingle.toString() === 'null'
    );

    unitTests.add(
        'pop() on llist with more than one node',
        llist.pop().value === 2
    );

    unitTests.add(
        'llist with more than one node had last node removed',
        llist.toString() === '( 0 ) -> ( 1 ) -> null'
    );

    // contains

    llistEmpty = unitTests.createListFromArgs(); // Always keep as empty list before new test
    llistSingle = unitTests.createListFromArgs(0); // Always keep as single node list before test
    llist = unitTests.createListFromArgs(0,1,2); // Can have any number of nodes before new test

    unitTests.add(
        'contains() on empty list',
        llistEmpty.contains(0) === false
    );

    unitTests.add(
        'contains() on single node list that contains value',
        llistSingle.contains(0) === true
    );

    unitTests.add(
        'contains() on single node list that does NOT contain value',
        llistSingle.contains(1) === false
    );

    unitTests.add(
        'contains() on list with more than one node that contains value in first node',
        llist.contains(0) === true
    );

    unitTests.add(
        'contains() on list with more than one node that contains value in middle node',
        llist.contains(1) === true
    );

    unitTests.add(
        'contains() on list with more than one node that contains value in last node',
        llist.contains(2) === true
    );

    unitTests.add(
        'contains() on list with more than one node that does NOT contain value',
        llist.contains(3) === false
    );

    // find

    unitTests.add(
        'find() on empty list',
        llistEmpty.find(0) === null
    );

    unitTests.add(
        'find() on single node list with matching value',
        llistSingle.find(0) === 0
    );

    unitTests.add(
        'find() on single node list with NO matching value',
        llistSingle.find(1) === null
    );

    unitTests.add(
        'find() on list with more than one node with matching first value',
        llist.find(0) === 0
    );

    unitTests.add(
        'find() on list with more than one node with matching middle value',
        llist.find(1) === 1
    );

    unitTests.add(
        'find() on list with more than one node with matching end value',
        llist.find(2) === 2
    );

    unitTests.add(
        'find() on list with more than one node with NO matching value',
        llist.find(3) === null
    );

    // insertAt
    
    unitTests.add(
        'insertAt() with negative index',
        llist.insertAt(10, -1) === undefined
    );

    llistEmpty.insertAt(0, 0);
    unitTests.add(
        'insertAt() first index of empty list',
        llistEmpty.toString() === '( 0 ) -> null'
    );

    llistSingle.insertAt(10, 0);
    unitTests.add(
        'insertAt() first index of single node list',
        llistSingle.toString() === '( 10 ) -> ( 0 ) -> null'
    );

    llistSingle = unitTests.createListFromArgs(0);
    llistSingle.insertAt(10, 1);
    unitTests.add(
        'insertAt() after last index of single node list',
        llistSingle.toString() === '( 0 ) -> ( 10 ) -> null'
    );

    llist.insertAt(10, 0);
    unitTests.add(
        'insertAt() first index of list with more than one node',
        llist.toString() === '( 10 ) -> ( 0 ) -> ( 1 ) -> ( 2 ) -> null'
    );

    llist = unitTests.createListFromArgs(0,1,2);
    llist.insertAt(10, 1);
    unitTests.add(
        'insertAt() middle index of list with more than one node',
        llist.toString() === '( 0 ) -> ( 10 ) -> ( 1 ) -> ( 2 ) -> null'
    );

    llist = unitTests.createListFromArgs(0,1,2);
    llist.insertAt(10, 2);
    unitTests.add(
        'insert() at last index of list with more than one node',
        llist.toString() === '( 0 ) -> ( 1 ) -> ( 10 ) -> ( 2 ) -> null'
    );

    llist = unitTests.createListFromArgs(0,1,2);
    llist.insertAt(10, 3);
    unitTests.add(
        'insertAt() after last index of list with more than one node',
        llist.toString() === '( 0 ) -> ( 1 ) -> ( 2 ) -> ( 10 ) -> null'
    );

    // removeAt

    llistEmpty = unitTests.createListFromArgs(); // Always keep as empty list before new test
    llistSingle = unitTests.createListFromArgs(0); // Always keep as single node list before test
    llist = unitTests.createListFromArgs(0,1,2); // Can have any number of nodes before new test

    unitTests.add(
        'removeAt() on empty list',
        llistEmpty.removeAt(0) === undefined
    );

    unitTests.add(
        'removeAt() on first node of single node list',
        llistSingle.removeAt(0) === 0
    );

    unitTests.add(
        'single node list is empty after first node is removed',
        llistSingle.toString() === 'null'
    );

    llistSingle = unitTests.createListFromArgs(0);
    debugger;
    unitTests.add(
        'removeAt() on index past end of single node list',
        llistSingle.removeAt(1) === undefined
    );

    unitTests.add(
        'removeAt() with negative index',
        llist.removeAt(-1) === undefined
    );

    unitTests.add(
        'removeAt() of first index of list with more than one node',
        llist.removeAt(0) === 0
    );

    unitTests.add(
        'list has correct node removed',
        llist.toString() === '( 1 ) -> ( 2 ) -> null'
    );

    llist = unitTests.createListFromArgs(0,1,2);
    unitTests.add(
        'removeAt() of middle index of list with more than one node',
        llist.removeAt(1) === 1
    );

    unitTests.add(
        'list has correct node removed',
        llist.toString() === '( 0 ) -> ( 2 ) -> null'
    );

    llist = unitTests.createListFromArgs(0,1,2);
    debugger;
    unitTests.add(
        'removeAt() of last index of list with more than one node',
        llist.removeAt(2) === 2
    );

    unitTests.add(
        'list has correct node removed',
        llist.toString() === '( 0 ) -> ( 1 ) -> null'
    );

    llist = unitTests.createListFromArgs(0,1,2);
    unitTests.add(
        'removeAt() of index past end of list with more than one node',
        llist.removeAt(3) === undefined
    );

    unitTests.print();
})();
