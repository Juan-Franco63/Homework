import { createSlice } from "@reduxjs/toolkit";
import { Pila } from "./Pila";
import { Cola } from "./Cola";

const initialState = {
  clientes: [],
  clienteActual: 0,
};

const clientesSlice = createSlice({
  name: "clientes",
  initialState,
  reducers: {
    agregarCliente: (state, action) => {
      const { nombre, tipo, texto } = action.payload;
      const clienteIndex = state.clientes.findIndex((c) => c.nombre === nombre);

      if (clienteIndex === -1) {
        // Crear nuevo cliente
        const nuevoCliente = {
          nombre,
          consultas: new Cola(),
          reclamos: new Pila(),
        };

        if (tipo === "consulta") {
          nuevoCliente.consultas.enqueue(texto);
        } else {
          nuevoCliente.reclamos.push(texto);
        }

        state.clientes.push(nuevoCliente);

        // Mostrar automáticamente el nuevo cliente
        state.clienteActual = state.clientes.length - 1;
      } else {
        // Cliente ya existe
        const cliente = state.clientes[clienteIndex];

        if (tipo === "consulta") {
          cliente.consultas.enqueue(texto);
        } else if (tipo === "reclamo") {
          cliente.reclamos.push(texto);
        }

        // Forzar nueva referencia para que Redux detecte el cambio
        state.clientes[clienteIndex] = {
          ...cliente,
          consultas: cliente.consultas,
          reclamos: cliente.reclamos,
        };
      }
    },

    siguienteCliente: (state) => {
      if (state.clientes.length > 0) {
        state.clienteActual = (state.clienteActual + 1) % state.clientes.length;
      }
    },

    anteriorCliente: (state) => {
      if (state.clientes.length > 0) {
        state.clienteActual =
          (state.clienteActual - 1 + state.clientes.length) % state.clientes.length;
      }
    },
  },
});

export const {
  agregarCliente,
  siguienteCliente,
  anteriorCliente,
} = clientesSlice.actions;

export default clientesSlice.reducer;
