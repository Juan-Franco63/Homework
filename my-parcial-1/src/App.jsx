import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import './App.css'

function App() {
  const [imagenes, setImagenes] = useState([])
  const [titulo, setTitulo] = useState("")
  const [NumeroRandom, setNumeroRandom] = useState(Math.floor(Math.random() * 1000))
  const [alto, setAlto] = useState(400)
  const [ancho, setAncho] = useState(400)
  const [busqueda, setBusqueda] = useState("")

  const añadirImagen = () => {
    if (titulo === "") return;

    const nuevaImagen = {
      id: uuidv4(),
      NumeroRandom, NumeroRandom,
      url: `http://picsum.photos/300/400?random=${NumeroRandom}`,
      titulo: titulo,
      alto: alto,
      ancho: ancho
    };

    setImagenes([...imagenes, nuevaImagen])
    setNumeroRandom(Math.floor(Math.random() * 1000))
    setTitulo("")
    setAlto(400)
    setAncho(400)
  };

  const filtrarImagenes = imagenes.filter((imagen) => 
    imagen.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );


  return (
    <div>
      <h1>Imágenes</h1>

      <input
        type="text"
        placeholder="título de la imagen"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        />

      <input
        type="number"
        placeholder="Id de la imagen"
        value={NumeroRandom}
        onChange={(e) => setNumeroRandom(e.target.value)}
        />

      <button onClick={añadirImagen}>Añadir</button>

      <input
        type="text"
        placeholder="buscar imagen"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        />
      
      <div>
        {filtrarImagenes.map((imagen) => (
          <div key={imagen.id}>
            <h3>{imagen.titulo}</h3>
            <img
              src={imagen.url}
              alt={imagen.titulo}
              height={imagen.alto}
              width={imagen.ancho}
            />
          </div>

        ))}
      </div>
    </div>
  )
}

export default App




