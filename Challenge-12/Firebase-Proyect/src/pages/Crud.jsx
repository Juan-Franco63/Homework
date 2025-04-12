import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';



const Crud = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  const itemsCollection = collection(db, 'items');

  const fetchItems = async () => {
    const snapshot = await getDocs(itemsCollection);
    const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setItems(docs);
  };

  const handleAdd = async () => {
    if (!input.trim()) return;
    await addDoc(itemsCollection, { text: input });
    setInput('');
    fetchItems();
  };

  const handleDelete = async () => {
    if (!selectedItemId) return alert('Selecciona un elemento para eliminar.');
    await deleteDoc(doc(db, 'items', selectedItemId));
    setSelectedItemId(null);
    setInput('');
    fetchItems();
  };

  const handleEdit = async () => {
    if (!selectedItemId || !input.trim()) return alert('Selecciona un elemento y escribe algo para editar.');
    await updateDoc(doc(db, 'items', selectedItemId), { text: input });
    setSelectedItemId(null);
    setInput('');
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const dispatch = useDispatch();
const navigate = useNavigate();

const handleLogout = async () => {
    await auth.signOut();
  dispatch(logout());
  navigate('/login');
};


  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 20 }}>
      <h2 style={{ textAlign: 'center' }}>CRUD </h2>

      <input
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          marginBottom: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc'
        }}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Escribe algo..."
      />

      <div style={{ display: 'flex', gap: '10px', marginBottom: 20 }}>
        <button onClick={handleAdd} style={{ flex: 1 }}>Agregar</button>
        <button onClick={handleEdit} style={{ flex: 1 }}>Editar seleccionado</button>
        <button onClick={handleDelete} style={{ flex: 1 }}>Eliminar seleccionado</button>
      </div>

      <div style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {items.map((item) => (
            <li
              key={item.id}
              onClick={() => {
                setSelectedItemId(item.id);
                setInput(item.text);
              }}
              style={{
                padding: '10px',
                marginBottom: '5px',
                borderRadius: '5px',
                cursor: 'pointer',
                backgroundColor: selectedItemId === item.id ? '#d0f0ff' : '#f9f9f9',
                border: selectedItemId === item.id ? '2px solid #007bff' : '1px solid #ccc'
              }}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
        <Link to="/dashboard"><button>Ir al Dashboard</button></Link>
        <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
    </div>
    
  );
};

export default Crud;
