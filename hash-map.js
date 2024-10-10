import LinkedList from "./linkedlist.js";

class HashMap {
    #hashMap;
    #entries;
    constructor() {
        this.capacity = 8;
        this.loadFactor = 1;
        this.#entries = 0;
        this.clear();
    }

    length() {
        //let length = 0;
        //for (bucket of this.#hashMap) {
        //    for (entry of bucket) {
        //        length += 1;
        //    }
        //}
        //return length;
        return this.#entries;
    }

    hash(key) {
        let hashCode = 0;
           
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity+1;
        }
     
        return hashCode;
    }

    set(key, value) {
        console.log(this.#hashMap);
        if (this.#entries+1 > this.capacity*this.loadFactor) {
            this.capacity += this.capacity;
            const oldHashMap = this.#hashMap;
            this.clear();
            for (let bucket of oldHashMap) {
                bucket = bucket.head;
                if (bucket === null) return;
                while (bucket.next !== null) {
                    this.set(bucket.value[0], bucket.value[1]);
                    bucket = bucket.next;
                }
            }
            this.set(bucket.value[0], bucket.value[1]);
            return;
        }
        if (this.has(key)) {
            const bucket = this.#hashMap[this.hash(key)].head;
            while(bucket.next != null) {
                if (bucket.value[0] === key) return bucket.value[1];
                bucket = bucket.next;
            }
            bucket.value[1] = value;
            return
        }
        this.#hashMap[this.hash(key)].append([key, value]);
        this.#entries += 1;
    }

    remove(key) {
        if (this.has(key)) {
            const bucket = this.#hashMap[this.hash(key)].head;
            const previousBucket = null;
            this.#entries -= 1;
            while(bucket.next != null) {
                if (bucket.value[0] === key) break;
                previousBucket = bucket;
                bucket = bucket.next;
            }
            if (previousBucket) {
                previousBucket.next = bucket.next;
                return true;
            }
            bucket.pop();
            return true;
        } else return false
    }

    get(key) {
        const bucket = this.#hashMap[this.hash(key)].head;
        if (bucket === null) return false;
        while(bucket.next != null) {
            if (bucket.value[0] === key) return bucket.value[1];
            bucket = bucket.next;
        }
        if (bucket.value[0] === key) return true;
        return bucket.value[1];
    }

    has(key) {
        const bucket = this.#hashMap[this.hash(key)].head;
        if (bucket === null) return false;
        while(bucket.next != null) {
            if (bucket.value[0] === key) return true;
            bucket = bucket.next;
        }
        if (bucket.value[0] === key) return true;
        return false;
    }

    clear() {
        this.#hashMap = [];
        this.#entries = 0;
        for (let i = 0; i < this.capacity; i++) {
            this.#hashMap.push(new LinkedList);
        }
    }

    keys() {
        const keys = [];
        for (bucket of this.#hashMap) {
            bucket = bucket.head;
            keys.append(bucket.value[0]);
            while (bucket.next != null) {
                bucket = bucket.next;
                keys.append(bucket.value[0]);
            }
        }
        return keys;
    }

    values() {
        const values = [];
        for (bucket of this.#hashMap) {
            bucket = bucket.head;
            values.append(bucket.value[0]);
            while (bucket.next != null) {
                bucket = bucket.next;
                values.append(bucket.value[1]);
            }
        }
        return values;
    }

    entries() {
        const entries = [];
        for (bucket of this.#hashMap) {
            bucket = bucket.head;
            entries.append(bucket.value[0]);
            while (bucket.next != null) {
                bucket = bucket.next;
                entries.append(bucket.value);
            }
        }
        return entries;
    }
}

export default HashMap;