import { useState, useEffect } from 'react';
import { ref, push, onValue } from 'firebase/database';
import { rtdb, auth } from '../firebase/config';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { Link, useNavigate } from 'react-router-dom'; 

const RealtimeChat = () => {
  const [message, setMessage] = useState('');
  const [messagesList, setMessagesList] = useState([]);
  const { uid, displayName } = useSelector(state => state.auth);

  useEffect(() => {
    const messagesRef = ref(rtdb, 'mensajes/');

    // 👂 Escucha los cambios en tiempo real
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messagesArray = data ? Object.entries(data).map(([id, val]) => ({
        id,
        ...val
      })) : [];
      setMessagesList(messagesArray);
    });

    return () => unsubscribe();
  }, []);

  const handleSend = async () => {
    if (!message.trim()) return;

    const newMessage = {
      text: message,
      uid,
      name: displayName || 'Anon',
      timestamp: Date.now()
    };

    await push(ref(rtdb, 'mensajes/'), newMessage);
    setMessage('');
  };

  const dispatch = useDispatch();
const navigate = useNavigate();

const handleLogout = async () => {
  await auth.signOut();
  dispatch(logout());
  navigate('/login');
};


  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h2>Chat en Tiempo Real</h2>

      <div style={{ border: '1px solid #ccc', padding: 10, borderRadius: 5, marginBottom: 15 }}>
        {messagesList.map((msg) => (
          <div key={msg.id} style={{ marginBottom: 8 }}>
            <strong>{msg.name}</strong>: {msg.text}
          </div>
        ))}
      </div>

      <input
        type="text"
        placeholder="Escribe tu mensaje..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        style={{ width: '80%', padding: 10 }}
      />
      <button onClick={handleSend} style={{ padding: 10, marginLeft: 10 }}>Enviar</button>
      <div style={{ marginTop: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
  <Link to="/dashboard"><button>Volver al Dashboard</button></Link>
  <button onClick={handleLogout}>Cerrar sesión</button>
</div>

    </div>
    
  );
};

export default RealtimeChat;
