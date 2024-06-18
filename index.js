class Node {
    constructor(key = null, left = null, right = null) {
        this.key = key;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor() {
        this.root = this.buildTree();
    }
}