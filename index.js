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