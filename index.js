class Node {
    constructor(key = null, left = null, right = null) {
        this.key = key;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    sortAndRemoveDuplicates(array) {
        const result = [...new Set(array)].sort((a, b) => a - b);
        return result;
    }

    buildTree(array) {
        let sortedArray = this.sortAndRemoveDuplicates(array);
        if (sortedArray.length === 0) return null;
        const mid = parseInt(sortedArray.length / 2);
        const root = new Node(
            sortedArray[mid],
            this.buildTree(sortedArray.slice(0, mid)),
            this.buildTree(sortedArray.slice(mid + 1))
        );
        return root;
    }

    insert(value, root = this.root) {
        if (root === null) return new Node(value);
        root.key > value
            ? root.left = this.insert(value, root.left)
            : root.right = this.insert(value, root.right);
        return root;
    }

    deleteItem(value, root = this.root) {
        if (root === null) return root;
        if (root.key > value) root.left = this.deleteItem(value, root.left);
        else if (root.key < value) root.right = this.deleteItem(value, root.right);
        else {
            if (root.left === null) return root.right;
            else if (root.right === null) return root.left;
            root.key = this.minValue(root.right);
            root.right = this.deleteItem(value, root.right);
        }
        return root;
    }

    find(value, root = this.root) {
        const node = root;
        if (node === null) return null;
        if (node.key === value) return node;
        return node.key > value
            ? this.find(value, node.left)
            : this.find(value, node.right);
    }

    levelOrder(callback) {
        if (!this.root) return [];
        const queue = [this.root];
        const results = [];
        while (queue.length) {
            let level = [];
            let size = queue.length;
            for (let i = 0; i < size; i++) {
                const node = queue.shift();
                level.push(node.key);
                if (node.left) queue.push(node.left);
                if (node.right) queue.push(node.right);
                if (callback) callback(node);
            }
            results.push(level);
        }
        if (!callback) return results;
    }

    // left root right
    inOrder(callback) {
        if (!this.root) return [];
        const stack = [this.root];
        const results = [];
        while (stack.length) {
            const node = stack.pop();
            if (node.left) stack.push(node.left);
            if (callback) callback(node);
            results.push(node.key);
            if (node.right) stack.push(node.right);
        }
        return results;
    }

    // root left right
    preOrder(callback) {
        if (!this.root) return [];
        const stack = [this.root];
        const results = [];
        while (stack.length) {
            const node = stack.pop();
            if (callback) callback(node);
            results.push(node.key);
            if (node.left) stack.push(node.left);
            if (node.right) stack.push(node.right);
        }
        return results;
    }

    // left right root
    postOrder(callback) {
        if (!this.root) return [];
        const stack = [this.root];
        const results = [];
        while (stack.length) {
            const node = stack.pop();
            if (node.left) stack.push(node.left);
            if (node.right) stack.push(node.right);
            if (callback) callback(node);
            results.push(node.key);
        }
        return results;
    }

    height(node = this.root) {
        if (node === null)
            return -1;

        const leftHeight = this.height(node.left);
        const rightHeight = this.height(node.right);
        
        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(node, root = this.root, level = 0) {
        if (!node) return null;
        if (root === null) return 0;
        if (root.key === node.key) return level;
        let count = this.depth(node, root.left, level + 1);
        if (count !== 0) return count;
        return this.depth(node, root.right, level + 1);
    }

    isBalanced(node = this.root) {
        if (node === null) return true;
        const heightDiff = Math.abs(
            this.height(node.left) - this.height(node.right)
        );
        return (
            heightDiff <= 1
            && this.isBalanced(node.left)
            && this.isBalanced(node.right)

        );
    }

    rebalance() {
        if (this.root === null) return;
        const sorted = [...new Set(this.inOrder().sort((a, b) => a - b))];
        this.root = this.buildTree(sorted);
    }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.key}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
}; 

const tree = new Tree([1,2,3,4,5]);
prettyPrint(tree.root);
console.log(`Height of the tree is: ${tree.height()}`);
console.log(`Depth of node "4" is: ${tree.depth(new Node(4))}`)
console.log(tree.isBalanced());