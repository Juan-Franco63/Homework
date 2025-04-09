
export class Pila {
    constructor() {
      this.items = [];
    }
  
    push(elemento) {
      this.items.push(elemento);
    }
  
    pop() {
      return this.items.pop();
    }
  
    getAll() {
      return [...this.items].reverse();
    }
  }
   