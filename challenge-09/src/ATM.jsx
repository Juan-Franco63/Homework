class ATM {
    constructor() {
        this.people = []; 
    }

    enqueue(person) {
        this.people.push(person);
    }

    dequeue() {
        return this.people.length > 0 ? this.people.shift() : null;
    }

    peek() {
        return this.people.length > 0 ? this.people[0] : null;
    }

    isEmpty() {
        return this.people.length === 0; 
    }

    size() {
        return this.people.length; 
    }

    print() {
        return [...this.people]; 
    }
}


const queue = new ATM();
queue.enqueue({ Name: 'Mark', Withdrawal: 1000 });
queue.enqueue({ Name: 'Elon', Withdrawal: 2000 });
queue.enqueue({ Name: 'Steve', Withdrawal: 500 });
queue.enqueue({ Name: 'Peter', Withdrawal: 1500 });
queue.enqueue({ Name: 'Clayton', Withdrawal: 3000 });

export default ATM;
