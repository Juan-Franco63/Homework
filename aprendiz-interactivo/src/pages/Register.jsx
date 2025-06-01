import { useState } from "react";
import { registerUser } from "../firebase/auth";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.scss";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      navigate("/dashboard");
    } catch (error) {
      alert("Error al registrarse: " + error.message);
    }
  };

  return (
    <form onSubmit={handleRegister} className={styles.authForm}>
      <h2>Crear cuenta</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Registrarse</button>
    </form>
  );
}
