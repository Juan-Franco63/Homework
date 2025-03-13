import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LinkedListPage from "./Pages/LinkedListPage";
import DoublyLinkedListPage from "./Pages/DoublyLinkedListPage";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/linked-list"> Linked List</Link> | 
        <Link to="/doubly-linked-list"> Doubly Linked List</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Welcome! Choose a page.</h1>} />
        <Route path="/linked-list" element={<LinkedListPage />} />
        <Route path="/doubly-linked-list" element={<DoublyLinkedListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
