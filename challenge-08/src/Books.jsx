class Books {
    constructor() {
        this.Books = []; // Aquí guardaremos los libros como un stack (pila)
    }

    push(book) {
        this.Books.push(book);
    }

    pop(){
        return this.Books.length > 0 ? this.Books.pop() : null;
    }

    peek(){
        return this.Books.length > 0 ? this.Books[this.Books.length - 1] : null;
    }

    isEmpty(){
        return this.Books.length === 0;
    }

    size(){
        return this.Books.length;
    }

    print(){
        return [...this.Books].reverse(); 
    }
}

const stack = new Books();
stack.push({Name: 'Elon Musk', ISBN: '9780804139021', Author: 'Ashlee Vance', Editorial: 'Virgin Books'});
stack.push({Name: 'Steve Jobs', ISBN: '9781451648546', Author: 'Walter Isaacson', Editorial: 'Simon & Schuster'});
stack.push({Name: 'The Lean Startup', ISBN: '9780307887894', Author: 'Eric Ries', Editorial: 'Crown Business'});
stack.push({Name: 'Zero to One', ISBN: '9780804139021', Author: 'Peter Thiel', Editorial: 'Virgin Books'});
stack.push({Name: 'The Innovator’s Dilemma', ISBN: '9781633691780', Author: 'Clayton M. Christensen', Editorial: 'Harvard Business Review Press'});

console.log(stack.pop());
console.log(stack.peek());
console.log(stack.isEmpty());

stack.print


export default Books;
