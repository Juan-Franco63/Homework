import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../firebase/config";
import { login, logout, checkingCredentials } from "../store/authSlice";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch(checkingCredentials());

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(login({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "",
          photoUrl: user.photoURL || ""
        }));
      } else {
        dispatch(logout());
      }
    });

    return () => unsubscribe();
  }, []);

  
  if (status === 'checking') {
    return <p style={{ textAlign: 'center', marginTop: '50px' }}>Cargando...</p>;
  }

  return children;
};

export default AuthProvider;
