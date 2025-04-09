import { configureStore } from "@reduxjs/toolkit";
import clientesReducer from "../Funciones/Clientes/clienteSlice";

export const store = configureStore({
  reducer: {
    clientes: clientesReducer,
  },
});
