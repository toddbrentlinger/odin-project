class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(arr) {
        // Create Set from sorted array
        const sortedUniqueArr = Array.from(
            new Set(
                arr.sort((a,b) => a - b)
            )
        );
        this.root = Tree.buildTree(sortedUniqueArr);
    }

    /**
     * 
     * @param {*[]} arr
     * @returns {Node|null} 
     */
    static buildTree(arr, left = 0, right = arr.length - 1) {
        // Base Case: Empty array
        if (left > right)
            return null;

        let mid = Math.floor((right + left) / 2);
        let root = new Node(arr[mid]);
        
        root.left = Tree.buildTree(arr, left, mid - 1);
        root.right = Tree.buildTree(arr, mid + 1, right);
        
        return root;
    }

    /**
     * 
     * @param {Node} root 
     * @param {*} data 
     * @returns {Node}
     */
    static insertRec(root, data) {
        // Base Case: root is null (leaf node)
        if (!root)
            return new Node(data);

        if (data < root.data) {
            root.left = Tree.insertRec(root.left, data);
        } else { // Else data > root.data
            root.right = Tree.insertRec(root.right, data);
        }

        // return node unchanged
        return root;
    }

    /**
     * 
     * @param {Node|null} root 
     * @param {*} data 
     * @returns {Node|null}
     */
    static deleteRec(root, data) {
        // Base Case: Return null if root is null
        if (!root)
            return null;

        if (data < root.data) {
            root.left = Tree.deleteRec(root.left, data);
        } else if (data > root.data) {
            root.right = Tree.deleteRec(root.right, data);
        } else { // Else node has matching data (node to delete)
            // If only left child (right child is null), return left child
            if (!root.right)
                return root.left;

            // If only right child (left child is null), return right child
            if (!root.left)
                return root.right;

            // If reach this point, root has two children
            // Get inorder successor (smallest value in right subtree)
            let inorderSuccVal = root.right;
            while (inorderSuccVal.left) {
                inorderSuccVal = inorderSuccVal.left;
            }

            // Assign root node value to inorder successor value
            root.data = inorderSuccVal.data;

            // Delete inorder successor
            root.right = Tree.deleteRec(root.right, inorderSuccVal.data);
        }

        return root;
    }

    /**
     * 
     * @param {Node} node 
     * @param {String} prefix 
     * @param {Boolean} isLeft 
     */
    static prettyPrint(node, prefix = '', isLeft = true) {
        if (node.right !== null) {
            Tree.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
        if (node.left !== null) {
            Tree.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    /**
     * Pre-order traversal of binary search tree node.
     * @param {Node} node 
     * @param {Function} func 
     * @returns {[*]}
     */
    static preorderRec(node, func = (data) => data) {
        if (!node) return [];

        return [func(node.data), ...Tree.preorderRec(node.left, func), ...Tree.preorderRec(node.right, func)];
    }

    /**
     * In-order traversal of binary search tree node.
     * @param {Node} node 
     * @param {Function} func 
     * @returns {[*]}
     */
    static inorderRec(node, func = (data) => data) {
        if (!node) return [];

        return [...Tree.inorderRec(node.left, func), func(node.data), ...Tree.inorderRec(node.right, func)];
    }

    /**
     * Post-order traversal of binary search tree node.
     * @param {Node} node 
     * @param {Function} func 
     * @returns {[*]}
     */
    static postorderRec(node, func = (data) => data) {
        if (!node) return [];

        return [...Tree.postorderRec(node.left, func), ...Tree.postorderRec(node.right, func), func(node.data)];
    }

    /** Prints tree contents to console. */
    print() {
        if (this.root)
            Tree.prettyPrint(this.root);
        else
            console.log('Tree is empty');
    }

    /**
     * Insert node with data into the binary search tree.
     * @param {*} data 
     */
    insert(data) {
        // If list is empty, add to root node
        if (!this.root) {
            this.root = new Node(data);
            return;
        }

        let currNode = this.root;
        while (true) {
            if (data < currNode.data) {
                if (currNode.left)
                    currNode = currNode.left;
                else {
                    currNode.left = new Node(data);
                    return;
                }
            } else if (data > currNode.data) {
                if (currNode.right)
                    currNode = currNode.right;
                else {
                    currNode.right = new Node(data);
                    return;
                }
            } else { // Else data == currNode.data
                // Return if duplicate value already in tree
                return;
            }
        }
    }

    /**
     * Delete node with data from the binary search tree.
     * @param {*} data 
     */
    delete(data) {
        Tree.deleteRec(this.root, data);
    }

    /**
     * Returns node with matching data from tree or undefined if no match.
     * @param {*} data 
     * @returns {Node|undefined} Node with matching data OR undefined if not found in tree
     */
    find(data) {
        let currNode = this.root;
        while (currNode) {
            if (data < currNode.data)
                currNode = currNode.left;
            else if (data > currNode.data)
                currNode = currNode.right;
            else // currNode.data == data
                return currNode;
        }
    }

    /**
     * 
     * @param {Function} func 
     * @returns {[*]}
     */
    levelOrder(func = (data) => data) {
        // Return if empty tree
        if (!this.root)
            return;

        let queue = new Queue([this.root]);
        let funcReturnsArr = [];
        let currNode;

        while (!queue.isEmpty()) {
            currNode = queue.dequeue();

            if (currNode.left)
                queue.enqueue(currNode.left);
            if (currNode.right)
                queue.enqueue(currNode.right)
            
            funcReturnsArr.push(func(currNode.data));
        }

        return funcReturnsArr;
    }

    /**
     * 
     * @param {Function} func 
     * @param {Queue} queue 
     * @returns {[*]}
     */
    levelOrderRec(func = (data) => data, queue = new Queue()) {
        // TODO
    }

    /**
     * 
     * @param {Function} func 
     * @returns {[*]}
     */
    preorder(func = (data) => data) {
        return Tree.preorderRec(this.root, func);
    }

    /**
     * 
     * @param {Function} func 
     * @returns {[*]}
     */
    inorder(func = (data) => data) {
        return Tree.inorderRec(this.root, func);
    }

    /**
     * 
     * @param {Function} func 
     * @returns {[*]}
     */
    postorder(func = (data) => data) {
        return Tree.postorderRec(this.root, func);
    }
}

class QueueNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class Queue {
    constructor(arr) {
        this.front = null;
        this.back = null;
        this.buildQueueFromArray(arr);
    }

    /**
     * 
     * @param {[*]} arr
     * @returns {[QueueNode]} Reference to front and back QueueNodes of Queue 
     */
    buildQueueFromArray(arr) {
        for (let i = 0; i < arr.length; i++)
            this.enqueue(arr[i]);
    }

    /**
     * Adds QueueNode with data to back of the Queue.
     * @param {*} data 
     */
    enqueue(data) {
        const newNode = new QueueNode(data);

        // If Queue is empty, add node to front and back
        if (!this.front)
            this.front = newNode;
        else // Else set 'back' node 'next' to point to new node
            this.back.next = newNode;

        // Set 'back' to point to new node at end of the Queue
        this.back = newNode;
    }

    /**
     * Removes the front QueueNode from the front of the Queue and returns the data it was holding.
     * @returns {*}
     */
    dequeue() {
        if (!this.front)
            return null;
        
        const frontNode = this.front;
        this.front = this.front.next;

        /** If front is now null, set back to null, otherwise back would still 
         * point to node that was just dequeued. */
        if (!this.front)
            this.back = null;
        
        return frontNode.data;
    }

    isEmpty() {
        return this.front === null;
    }
}

class StackNode {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class Stack {
    constructor(arr) {
        this.top = null;
        this.buildStackFromArray(arr);
    }

    /**
     * 
     * @param {[*]} arr
     * @returns {[StackNode]} Reference to top StackNode and bottom StackNode in Stack 
     */
    buildStackFromArray(arr) {
        let newNode;
        for (let i = 0; i < arr.length; i++) {
            newNode = new StackNode(arr[i]);
            if (this.top)
                newNode.next = this.top;
            this.top = newNode;
        }
    }

    /**
     * Adds StackNode with data to top of the Stack.
     * @param {*} data 
     */
    push(data) {
        const newNode = new StackNode(data);
        if (this.top)
            newNode.next = this.top;
        this.top = newNode;
    }

    /**
     * Removes top QueueNode from the top of the Stack and returns that data it was holding.
     * Returns null if Queue is empty.
     * @returns {*}
     */
    pop() {
        if (!this.top)
            return null;
        
        const topNode = this.top;
        this.top = this.top.next;
        return topNode.data;
    }
}

window.tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
tree.print();
Tree.preorderRec(tree.root);
Tree.inorderRec(tree.root);
Tree.postorderRec(tree.root);

window.stack = new Stack([0,1,2,3,4,5]);
window.queue = new Queue([0,1,2,3,4,5]);

window.Stack = Stack;
window.Queue = Queue;
