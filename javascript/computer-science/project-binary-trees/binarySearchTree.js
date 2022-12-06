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
        
    }

    /**
     * Delete node with data from the binary search tree.
     * @param {*} data 
     */
    delete(data) {

    }
}
