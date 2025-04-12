import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from "firebase/auth";
import { auth } from "../firebase/config";
import { checkingCredentials, login, logout } from "./authSlice";

// Registro con email y contraseña
export const startRegisterWithEmailPassword = ({ email, password, displayName }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: ""
      });

      // Cierra sesión después del registro
      await auth.signOut();

      dispatch(logout({ errorMessage: "Cuenta creada correctamente. Inicia sesión para continuar." }));
    } catch (error) {
      dispatch(logout({ errorMessage: error.message }));
    }
  };
};

// Login con Google
const googleProvider = new GoogleAuthProvider();

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      dispatch(login({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "",
        photoUrl: user.photoURL || ""
      }));
    } catch (error) {
      dispatch(logout({ errorMessage: error.message }));
    }
  };
};
