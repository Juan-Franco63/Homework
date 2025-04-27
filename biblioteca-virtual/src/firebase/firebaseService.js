import { collection, addDoc, deleteDoc, doc, onSnapshot, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase"; 

// Escuchar en tiempo real el catálogo de libros disponibles
export function suscribirCatalogo(callback) {
  const ref = collection(db, "catalogo");
  return onSnapshot(ref, (snapshot) => {
    const libros = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(libros);
  });
}

// Escuchar en tiempo real los libros que están prestados
export function suscribirLibrosPrestados(callback) {
  const ref = collection(db, "librosPrestados");
  return onSnapshot(ref, (snapshot) => {
    const libros = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(libros);
  });
}

// Escuchar en tiempo real las colas de espera de los libros
export function suscribirColas(callback) {
  const ref = collection(db, "colas");
  return onSnapshot(ref, (snapshot) => {
    const colas = {};
    snapshot.forEach(doc => {
      const data = doc.data();
      colas[doc.id] = {
        titulo: data.titulo || "Título desconocido",
        usuarios: data.usuarios || []
      };
    });
    callback(colas);
  });
}

// Escuchar en tiempo real el historial de devoluciones
export function suscribirHistorialDevoluciones(callback) {
  const ref = collection(db, "historialDevoluciones");
  return onSnapshot(ref, (snapshot) => {
    const historial = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(historial);
  });
}

// Agregar un libro a la colección de libros prestados
export async function agregarLibroPrestado(libro) {
  const ref = collection(db, "librosPrestados");
  await addDoc(ref, libro);
}

// Agregar un libro de nuevo al catálogo (por ejemplo, después de devolución)
export async function agregarLibroCatalogo(libro) {
  const ref = collection(db, "catalogo");
  await addDoc(ref, libro);
}

// Agregar un libro devuelto al historial de devoluciones
export async function agregarAlHistorialDevoluciones(libro) {
  const ref = collection(db, "historialDevoluciones");
  await addDoc(ref, libro);
}

// Eliminar un libro de la colección de catálogo
export async function eliminarLibroCatalogo(id) {
  const ref = doc(db, "catalogo", id);
  await deleteDoc(ref);
}

// Eliminar un libro de la colección de libros prestados
export function eliminarLibroPrestado(id) {
  const ref = doc(db, "librosPrestados", id);
  return deleteDoc(ref);
}

// Agregar un usuario a la cola de espera de un libro (evitando duplicados y guardando título)
export async function agregarACola(libroId, usuario, tituloLibro) {
  const ref = doc(db, "colas", libroId);
  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    const data = docSnap.data();
    const usuariosActuales = data.usuarios || [];

    if (usuariosActuales.includes(usuario)) {
      throw new Error("El usuario ya está en la cola de espera.");
    }

    await updateDoc(ref, {
      usuarios: [...usuariosActuales, usuario]
    });

  } else {
    await setDoc(ref, {
      titulo: tituloLibro,
      usuarios: [usuario]
    });
  }
}

// Sacar al primer usuario de la cola de espera de un libro
export async function sacarDeCola(libroId) {
  const ref = doc(db, "colas", libroId);
  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    const usuariosActuales = docSnap.data().usuarios || [];
    const nuevaCola = usuariosActuales.slice(1);

    if (nuevaCola.length > 0) {
      await updateDoc(ref, {
        usuarios: nuevaCola
      });
    } else {
      await deleteDoc(ref);
    }
  }
}

// Eliminar un libro del historial de devoluciones
export async function eliminarHistorialDevolucion(id) {
  const ref = doc(db, "historialDevoluciones", id);
  await deleteDoc(ref);
}
