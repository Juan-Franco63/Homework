import React, { useState, useEffect, useRef } from "react";
import Books from "./Books"; 

const BookApp = () => {
    const stackRef = useRef(new Books()); 
    const [name, setName] = useState("");
    const [isbn, setIsbn] = useState("");
    const [author, setAuthor] = useState("");
    const [editorial, setEditorial] = useState("");
    const [books, setBooks] = useState([]);
    useEffect(() => {
        if (stackRef.current.size() === 0) { 
            stackRef.current.push({ Name: 'Elon Musk', ISBN: '9780804139021', Author: 'Ashlee Vance', Editorial: 'Virgin Books' });
            stackRef.current.push({ Name: 'Steve Jobs', ISBN: '9781451648546', Author: 'Walter Isaacson', Editorial: 'Simon & Schuster' });
            stackRef.current.push({ Name: 'The Lean Startup', ISBN: '9780307887894', Author: 'Eric Ries', Editorial: 'Crown Business' });
            stackRef.current.push({ Name: 'Zero to One', ISBN: '9780804139021', Author: 'Peter Thiel', Editorial: 'Virgin Books' });
            stackRef.current.push({ Name: 'The Innovator’s Dilemma', ISBN: '9781633691780', Author: 'Clayton M. Christensen', Editorial: 'Harvard Business Review Press' });
        }
        setBooks([...stackRef.current.print()]); 
    }, []); 
    const handleAddBook = (e) => {
        e.preventDefault();
        
        const newBook = { Name: name, ISBN: isbn, Author: author, Editorial: editorial };
        stackRef.current.push(newBook);
        setBooks([...stackRef.current.print()]); 
        
        
        setName("");
        setIsbn("");
        setAuthor("");
        setEditorial("");
    };

    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
            <h2>Book Stack</h2>
            <form onSubmit={handleAddBook}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="text" placeholder="ISBN" value={isbn} onChange={(e) => setIsbn(e.target.value)} required />
                <input type="text" placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                <input type="text" placeholder="Editorial" value={editorial} onChange={(e) => setEditorial(e.target.value)} required />
                <button type="submit">Add Book</button>
            </form>
            
            <h3>Books in Stack</h3>
            {books.length > 0 ? (
                <ul>
                    {books.map((book, index) => (
                        <li key={index}>{book.Name} - {book.Author}</li>
                    ))}
                </ul>
            ) : (
                <p>No books in stack.</p>
            )}
        </div>
    );
};

export default BookApp;