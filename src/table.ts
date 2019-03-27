const DEFAULT_MAX = 5;
const DEFAULT_MIN = 0;

interface Table {
    minSize: number;
    maxSize: number;
}

class Table {
    constructor() {
        this.minSize = DEFAULT_MIN;
        this.maxSize = DEFAULT_MAX;
    }

    public outOfBounds(n: number) {
        return (n < this.minSize || n >= this.maxSize)
    }
}

export default Table;