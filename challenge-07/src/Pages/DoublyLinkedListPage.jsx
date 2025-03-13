import React, { useState } from "react";

class DoublyNode {
  constructor(page, prev = null, next = null) {
    this.page = page;
    this.prev = prev;
    this.next = next;
  }
}

class DoublyLinkedList {
  constructor() {
    const home = new DoublyNode("Home");
    const about = new DoublyNode("About", home);
    const contact = new DoublyNode("Contact", about);
    
    home.next = about;
    about.next = contact;
    
    this.head = home;
    this.tail = contact;
    this.current = home; // Comienza en "Home"
  }

  goBack() {
    if (this.current.prev) {
      this.current = this.current.prev;
    }
  }

  goForward() {
    if (this.current.next) {
      this.current = this.current.next;
    }
  }

  getCurrentPage() {
    return this.current.page;
  }
}

// Instancia con valores fijos
const browserHistory = new DoublyLinkedList();

const DoublyLinkedListPage = () => {
  const [currentPage, setCurrentPage] = useState(browserHistory.getCurrentPage());

  return (
    <div>
      <h1>Browser History</h1>
      <p>Current Page: {currentPage}</p>
      <button onClick={() => { browserHistory.goBack(); setCurrentPage(browserHistory.getCurrentPage()); }}>
        Back
      </button>
      <button onClick={() => { browserHistory.goForward(); setCurrentPage(browserHistory.getCurrentPage()); }}>
        Forward
      </button>
    </div>
  );
};

export default DoublyLinkedListPage;
