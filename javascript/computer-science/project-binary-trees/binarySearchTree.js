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
}

class QueueNode {
    constructor(data) {
        this.data = data;
    }
}

class Queue {
    constructor(arr) {
        this.front = this.back = null;
        buildQueueFromArray(arr);
    }

    /**
     * 
     * @param {[*]} arr
     * @returns {[QueueNode]} Reference to front and back QueueNodes of Queue 
     */
    buildQueueFromArray(arr) {

    }

    /**
     * Adds QueueNode with data to back of the Queue.
     * @param {*} data 
     */
    enqueue(data) {

    }

    /**
     * Removes, and returns, the front QueueNode from the front of the Queue.
     * @returns {QueueNode|null}
     */
    dequeue() {

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
window.stack = new Stack([0,1,2,3,4,5]);
