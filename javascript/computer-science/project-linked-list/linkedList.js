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
        if (!this.head) {
            this.head = new Node(value);
        } else {
            let currNode = this.head;
            while (currNode.next)
                currNode = currNode.next;
            currNode.next = new Node(value);
        }
    }

    /**
     * Adds a new node containing value to the start of the list.
     * @param {*} value 
     */
    prepend(value) {
        const newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
    }

    /**
     * Returns the total number of nodes in the list.
     * @returns {Number}
     */
    size() {
        let count = 0;
        let currNode = this.head;
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
        if (!this.head)
            return null;
        let currNode = this.head;
        while (currNode.next) {
            currNode = currNode.next;
        }
        return currNode;
    }
 
    /**
     * Returns the node at the given index or undefined if not in LinkedList.
     * @param {Number} index
     * @returns {Node|undefined}
     */
    at(index) {
        if (!this.head)
            return undefined;

        let currNode = this.head;
        while (index > 0 && currNode.next) {
            currNode = currNode.next;
            index--;
        }

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
            this.head = null;
            return currNode;
        }
        
        // If reach this point, there are 2 or more Nodes in list
        while (currNode.next.next)
            currNode = currNode.next;
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
        if (!this.head)
            return null;

        let i = 0, currNode = this.head;
        while (currNode) {
            if (currNode.value === value)
                return i;
            i++;
            currNode = currNode.next;
        }

        // If reach this point, value NOT in LinkedList
        return null;
    }

    /**
     * Represents the LinkedList object as a string.
     * @returns {String}
     */
    toString() {
        let str = '', currNode = this.head;

        while (currNode) {
            str += `( ${currNode.value} ) -> `;
            currNode = currNode.next;
        }

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
        if (index < 0) return;

        // Check for empty list
        if (!this.head) {
            this.head = new Node(value);
            return;
        }

        let currNode = this.head;
        while (index > 0 && currNode.next) {

        }
    }

    /**
     * Removes the node at the given index.
     * @param {Number} index 
     */
    removeAt(index) {
        // Return if list is empty OR index is less than 0
        if (!this.head || index < 0) return;

        let prevNode = this.head, currNode = this.head.next;

        while (index > 0 && currNode) {
            prevNode = currNode;
            currNode = currNode.next;
            index--;
        }

        prevNode.next = currNode ? currNode.next : null;
        return currNode;
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

    // insertAt Inserts a new node with the provided value at the given index.

    unitTests.add(
        'insertAt() with negative index',
        llist.insertAt(-1) === undefined
    );

    llistEmpty.insertAt(0, 0);
    unitTests.add(
        'insertAt() first index of empty list',
        llistEmpty.toString() === '( 0 ) -> null'
    );

    llistSingle.insertAt(-1, 0);
    unitTests.add(
        'insertAt() first index of single node list',
        llistSingle.toString() === '( -1 ) -> ( 0 )'
    );

    unitTests.add(
        'insertAt() after last index of single node list',
        
    );

    unitTests.add(
        'insertAt() first index of list with more than one node',
        
    );

    unitTests.add(
        'insertAt() middle index of list with more than one node',
        
    );

    unitTests.add(
        'insertAt() after last index of list with more than one node',
        
    );

    // removeAt Removes the node at the given index.

    llistEmpty = unitTests.createListFromArgs(); // Always keep as empty list before new test
    llistSingle = unitTests.createListFromArgs(0); // Always keep as single node list before test
    llist = unitTests.createListFromArgs(0,1,2); // Can have any number of nodes before new test

    unitTests.print();
})();
