/** Single node of binary search tree. */
class Node {
    /**
     * @constructor
     * @param {*} data 
     */
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

/** Binary search tree. */
class Tree {
    /**
     * @constructor
     * @param {[*]} arr 
     */
    constructor(arr) {
        // Create array from sorted set of numbers
        const sortedUniqueArr = Array.from(
            new Set(
                arr.sort((a,b) => a - b)
            )
        );
        
        this.root = Tree.buildTree(sortedUniqueArr);
    }

    /**
     * Creates binary search tree from sorted array of unique values.
     * @param {*[]} arr Array of sorted and unique values
     * @returns {Node|null} Root node of tree or null if tree is empty
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
     * Recursive method to insert node with given data into a binary search sub-tree.
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
     * Recursive method to remove node with data inside binary search sub-tree.
     * @param {Node|null} root 
     * @param {*} data 
     * @returns {Node|null} Node that was just removed OR null if node not present
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
     * Display binary search tree inside console.
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
     * @param {Function} func Callback function
     * @returns {[*]} Array with each index holding the data of a node
     */
    static preorderRec(node, func = (data) => data) {
        if (!node) return [];

        return [func(node.data), ...Tree.preorderRec(node.left, func), ...Tree.preorderRec(node.right, func)];
    }

    /**
     * In-order traversal of binary search tree node.
     * @param {Node} node 
     * @param {Function} func Callback function
     * @returns {[*]} Array with each index holding the data of a node
     */
    static inorderRec(node, func = (data) => data) {
        if (!node) return [];

        return [...Tree.inorderRec(node.left, func), func(node.data), ...Tree.inorderRec(node.right, func)];
    }

    /**
     * Post-order traversal of binary search tree node.
     * @param {Node} node 
     * @param {Function} func Callback function
     * @returns {[*]} Array with each index holding the data of a node
     */
    static postorderRec(node, func = (data) => data) {
        if (!node) return [];

        return [...Tree.postorderRec(node.left, func), ...Tree.postorderRec(node.right, func), func(node.data)];
    }

    /**
     * Get height of node in binary search tree. Height is zero for single node tree. Height is -1 for empty tree.
     * @param {Node} node 
     * @param {Number} nodeHeight 
     * @returns {Number} Height of the binary search tree node, zero for single node tree, or -1 for empty tree
     */
    static heightRec(node, nodeHeight = -1) {
        if (node) {
            return Math.max(Tree.heightRec(node.right, nodeHeight + 1), Tree.heightRec(node.left, nodeHeight + 1));
        }
        return nodeHeight;
    }

    
    static depthRec(root, nodeToFind, nodeDepth = -1) {
        if (!root) {
            return nodeDepth++;
        }
        if (root === nodeToFind) {
            return nodeDepth;
        }
        return Math.max(Tree.depthRec(root.right, nodeToFind, nodeDepth + 1), Tree.depthRec(root.left, nodeToFind, nodeDepth + 1));
    }

    /**
     * 
     * @param {Node} node
     * @returns {Boolean} 
     */
    static isBalancedRec(node) {
        if (!node) {
            return true;
        }

        if (Math.abs(Tree.heightRec(node.left) - Tree.heightRec(node.right)) > 1) {
            return false;
        }

        if (!Tree.isBalancedRec(node.left) || !Tree.isBalancedRec(node.right)) {
            return false;
        }

        // If reach this point, this node and all subsequence branches are balanced
        return true;
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
     * @param {Node|null} node Node of binary search tree 
     * @param {Function} func 
     * @param {Queue} queue 
     * @returns {[*]}
     */
    levelOrderRec(func = (data) => data, queue = this.root ? new Queue([this.root]) : new Queue()) {
        if (queue.isEmpty())
            return [];

        const node = queue.dequeue();
        if (node.left)
            queue.enqueue(node.left);
        if (node.right)
            queue.enqueue(node.right);

        return [...Tree.levelOrderRec(node.left, func, queue), Tree.levelOrderRec(node.right, func, queue)];
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

    /** Returns the height of the binary search tree. */
    height() {
        return Tree.heightRec(this.root);
    }

    /**
     * Returns the depth of the node in the binary search tree or -1 if node is NOT in the tree.
     * @param {Node} nodeToFind 
     * @returns {Number}
     */
    depth(nodeToFind) {
        let node = this.root;
        let depth = -1;

        while (node) {
            depth++;

            if (node === nodeToFind) {
                return depth;
            }

            node = (nodeToFind.data < node.data) ? node.left : node.right;
        }

        return -1;
    }

    /**
     * @returns {Boolean}
     */
    isBalanced() {
        return Tree.isBalancedRec(this.root);
    }

    rebalance() {
        // Get sorted array of tree node values using inorder traversal method
        const sortedArr = this.inorder();

        // Rebuild tree using sorted array
        this.root = Tree.buildTree(sortedArr);
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

        if (arr && Array.isArray(arr))
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

    /**
     * Peeks at the data in the front QueueNode of the Queue.
     * @returns {*} Data inside QueueNode in front of Queue or undefined if Queue is empty
     */
    peek() {
        if (this.isEmpty())
            return;
        
        return this.front.data;
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

function binarySearchTreeDriverTestInit() {
    // Create binary search tree from array of random numbers with 50-100 nodes
    let numNodes = Math.floor(Math.random() * 51) + 50;
    let randArr = new Array(numNodes);
    while (numNodes > 0) {
        numNodes--;
        randArr[numNodes] = Math.floor(Math.random() * 201);
    }
    let tree = new Tree(randArr);

    // Print initial tree
    tree.print();

    // Confirm the tree is balanced
    if (tree.isBalanced()) {
        console.log('Tree after construction is balanced');
    } else {
        console.error('Tree after construction is NOT balanced');
    }

    // Print out tree using each order traversal method
    console.log(tree.levelOrder());
    console.log(tree.preorder());
    console.log(tree.inorder());
    console.log(tree.postorder());

    // Unbalance the tree by adding 50-100 random numbers
    numNodes = Math.floor(Math.random() * 51) + 50;
    while (numNodes > 0) {
        tree.insert(Math.floor(Math.random() * 201));
        numNodes--;
    }

    // Print unbalanced tree
    tree.print();

    // Confirm the tree is NOT balanced
    if (tree.isBalanced()) {
        console.error('Tree after random inserting is balanced');
    } else {
        console.log('Tree after random inserting is NOT balanced');
    }

    // Balance the tree
    tree.rebalance();

    // Print balanced tree
    tree.print();

    // Confirm the tree is balanced
    if (tree.isBalanced()) {
        console.log('Tree after balancing is balanced');
    } else {
        console.error('Tree after balancing is NOT balanced');
    }

    // Print out tree using each order traversal method
    console.log(tree.levelOrder());
    console.log(tree.preorder());
    console.log(tree.inorder());
    console.log(tree.postorder());
}

binarySearchTreeDriverTestInit();

window.tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

tree.print();
tree.levelOrder();

Tree.preorderRec(tree.root);
Tree.inorderRec(tree.root);
Tree.postorderRec(tree.root);

window.stack = new Stack([0,1,2,3,4,5]);
window.queue = new Queue([0,1,2,3,4,5]);

window.Tree = Tree;
window.Stack = Stack;
window.Queue = Queue;
