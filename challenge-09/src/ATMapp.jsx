import React, { useState, useEffect, useRef } from "react";
import ATM from "./ATM";

const ATMapp = () => {
    const queueRef = useRef(new ATM());
    const [name, setName] = useState("");
    const [withdrawal, setWithdrawal] = useState("");
    const [people, setPeople] = useState([]);
    useEffect(() => {
        if (queueRef.current.size() === 0) {
            queueRef.current.enqueue({ Name: 'Mark', Withdrawal: 1000 });
            queueRef.current.enqueue({ Name: 'Elon', Withdrawal: 2000 });
            queueRef.current.enqueue({ Name: 'Steve', Withdrawal: 500 });
            queueRef.current.enqueue({ Name: 'Peter', Withdrawal: 1500 });
            queueRef.current.enqueue({ Name: 'Clayton', Withdrawal: 3000 });
        }
        setPeople([...queueRef.current.print()]);
    }, []);
    const handleAddPerson = (e) => {
        e.preventDefault();
        const newPerson = { Name: name, Withdrawal: withdrawal };
        queueRef.current.enqueue(newPerson);
        setPeople([...queueRef.current.print()]);
        setName("");
        setWithdrawal("");
    };

    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
            <h2>ATM Queue</h2>
            <form onSubmit={handleAddPerson}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="number" placeholder="Withdrawal" value={withdrawal} onChange={(e) => setWithdrawal(e.target.value)} required />
                <br />
                <br />
                <button type="submit">Add Person</button>
            </form>

            <h3>People in Queue</h3>
            {people.length > 0 ? (
                <ul>
                    {people.map((person, index) => (
                        <li key={index}>{person.Name} - {person.Withdrawal}</li>
                    ))}
                </ul>
            ) : (
                <p>No people in queue.</p>
            )}
        </div>
    );
};

export default ATMapp;