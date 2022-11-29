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
        let currNode = this.head;
        while (index > 0 && currNode) {
            currNode = currNode.next;
            index--;
        }

        return index > 0 ? undefined : currNode;
    }

    /**
     * Removes, and returns, the last element from the list.
     * @returns {Node|null}
     */
    pop() {
        // Check if empty list
        if (!this.head)
            return null;

        let prevNode, currNode = this.head;

        while (currNode.next) {
            prevNode = currNode;
            currNode = currNode.next;
        }

        // Check if single Node in list
        if (!this.head.next) {
            currNode = this.head;
            this.head = null;
            return currNode;
        }
        
        // If reach this point, there are 2 or more Nodes in list
        currNode = this.head;
        while (currNode.next.next)
            currNode = currNode.next;
    }

    /**
     * Returns true if the passed in value is in the list and otherwise returns false.
     * @param {*} value 
     * @returns {Boolean}
     */
    contains(value) {

    }

    /**
     * Returns the index of the node containing value, or null if not found.
     * @param {*} value 
     * @returns {Number|null}
     */
    find(value) {

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
     * Inserts a new node with the provided value at the given index.
     * @param {*} value 
     * @param {Number} index 
     */
    insertAt(value, index) {

    }

    /**
     * Removes the node at the given index.
     * @param {Number} index 
     */
    removeAt(index) {

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

        function print() {
            if (failedTests)
                console.error(`${failedTests} tests fail!`);
            else
                console.log('All tests pass!');
        }

        return {
            add,
            print,
        };
    })();
    
    let llistEmpty = new LinkedList();
    let llist = new LinkedList();
    let tempNode = new Node(1);
    llist.head = tempNode;

    // toString

    unitTests.add(
        'toString() on empty llist', 
        llistEmpty.toString() === 'null'
    );

    unitTests.add(
        'toString() on llist with single node',
        llist.toString() === '( 1 ) -> null'
    );

    // append

    llistEmpty.append(1);
    unitTests.add(
        'append() to empty llist',
        llistEmpty.toString() === '( 1 ) -> null'
    );
    llistEmpty.head = null; // Empty list for future tests

    llist.append(2);
    unitTests.add(
        'append() to llist with non-zero nodes',
        llist.toString() === '( 1 ) -> ( 2 ) -> null'
    );

    // prepend

    llistEmpty.prepend(1);
    unitTests.add(
        'prepend() to empty llist',
        llistEmpty.toString() === '( 1 ) -> null'
    );
    llistEmpty.head = null;

    llist.prepend(0);
    unitTests.add(
        'prepend() to llist with non-zero nodes',
        llist.toString() === '( 0 ) -> ( 1 ) -> ( 2 ) -> null'
    );

    // size

    unitTests.add(
        'size() of empty llist',
        llistEmpty.size() === 0
    );

    unitTests.add(
        'size() of llist with non-zero nodes',
        llist.size() === 3
    );

    // tail

    unitTests.add(
        'tail() of empty llist',
        llistEmpty.tail() === null
    );

    unitTests.add(
        'tail() of llist with non-zero nodes',
        llist.tail().value === 2
    );

    // at

    unitTests.add(
        'at() of empty llist',
        llistEmpty.at(0) === undefined
    );

    unitTests.add(
        'at() of first node in llist',
        llist.at(0).value === 0
    );

    unitTests.add(
        'at() of middle node in llist',
        llist.at(1).value === 1
    );

    unitTests.add(
        'at() of last node in llist',
        llist.at(2).value === 2
    );

    unitTests.add(
        'at() of one index past end of llist',
        llist.at(3) === undefined
    );

    unitTests.add(
        'at() of more than one index past end of llist',
        llist.at(4) === undefined
    );

    // pop

    // contains

    // find

    // insertAt

    // removeAt

    unitTests.print();
})();
