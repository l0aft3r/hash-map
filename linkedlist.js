class Node {
    constructor(value = null, nextNode = null) {
        this.value = value;
        this.nextNode = nextNode;
    }
}

class LinkedList {
    #head;
    constructor() {
        this.#head = null;
    }

    append(value) {
        if (this.#head === null) {
            this.#head = new Node(value = value);
            return;
        }
        let traversal = this.#head;
        while (traversal.nextNode != null) {
            traversal = traversal.nextNode;
        }
        traversal.nextNode = new Node(value = value);
    }

    prepend(value) {
        const newNode = new Node(value, this.#head);
        this.#head = newNode;
    }

    get size() {
        if (this.#head === null) return 0;
        let traversal = this.#head;
        let counter = 1;
        while (traversal.nextNode != null) {
            traversal = traversal.nextNode;
            counter += 1;
        }
        return counter;
    }

    get head() {
        return this.#head;
    }

    get tail() {
        if (this.#head === null) return null;
        let traversal = this.#head;
        while (traversal.nextNode != null) {
            traversal = traversal.nextNode;
        }
        return traversal;
    }

    at(index) {
        if (this.#head === null || index < 0) return -1;
        try {
            let traversal = this.#head;
            for (let i = 0; i < index; i++) {
                traversal = traversal.nextNode;
            }
            return traversal;
        }
        catch {
            return -1;
        }
    }

    pop() {
        if (this.#head === null) return null;
        if (this.size === 1) {
            this.#head = null;
            return
        }
        this.at(this.size-2).nextNode = null;
    }

    contains(value) {
        if (this.#head === null) return false;
        let traversal = this.#head;
        do {
            if (value === traversal.value) return true;
            traversal = traversal.nextNode;
        } 
        while (traversal.nextNode != null);

        return false;
    }

    find(value) {
        if (this.#head === null) return -1;
        let traversal = this.#head;
        for (let i = 0; i < this.size; i++) {
            if (traversal.value === value) return i;
            traversal = traversal.nextNode;
        }

        return -1;
    }

    toString() {
        if (this.#head === null) return null;
        let traversal = this.#head;
        let string = ''
        while (traversal.nextNode != null) {
            string = string.concat(`( ${traversal.value} ) -> `);
            traversal = traversal.nextNode;
        }
        string = string.concat(`( ${traversal.value} ) -> `);
        string += 'null';

        return string;
    }

    insertAt(value, index) {
        try { 
            const leftNode = index-1 >= 0 ? this.at(index-1) : null;
            const rightNode = index <= this.size-1 ? this.at(index) : null;
            console.log(rightNode);
            const newNode = new Node(value, rightNode);
            if (leftNode) leftNode.nextNode = newNode;
            else this.#head = newNode;
        }
        catch {
            throw new Error('Index out of range');
        }

    }

    removeAt(index) {
        try {
            const leftNode = this.at(index-1) != -1 ? this.at(index-1) : null;
            if (leftNode) leftNode.nextNode = this.at(index+1) != -1 ? this.at(index+1) : null;
            else this.#head = this.#head.nextNode;
        } catch {
            throw new Error('Index out of range');
        }   
    }
}

export default LinkedList;