
export class Cola {
    constructor() {
      this.items = [];
    }
  
    enqueue(elemento) {
      this.items.push(elemento);
    }
  
    dequeue() {
      return this.items.shift();
    }
  
    getAll() {
      return [...this.items];
    }
  }
  