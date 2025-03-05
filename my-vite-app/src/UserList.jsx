import './App.css';

export const UserList = () => {
    const users = [users, setUsers] = useState([
        {id:1, name: 'Juan'},
        {id:2, name: 'Pedro'},
        {id:3, name: 'Maria'}
    ]);

    return (
        <div>
            <h2>Lista de Usuarios</h2>

            {/* Esto es un comentario */}

            {
                users.lenght ===0 ?
            (
                <p>No hay usuarios</p>
            )
        :
            (
                <ul>
                    {
                        users.map(
                            (user) => (
                                <li key={user.id}>{user.name}</li>
                            )
                        )
                    }
                </ul>
            )
            }

            <button onClick={() => setUsers([])}>Vacias Lista usuarios</button>
        </div>
    );
}