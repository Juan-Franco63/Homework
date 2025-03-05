import { useState } from "react";

const ImageLoader = ({ añadirImagen }) => {
    const [url, setUrl] = useState("");
    const [titulo, setTitulo] = useState("");
    const [alto, setAlto] = useState(0);
    const [ancho, setAncho] = useState(0);

    const handleAñadirImagen = () => {
        e.campovacio();
        if (!url || !titulo || !alto || !ancho) return text = "Campo vacio";
        añadirImagen({ url, titulo, alto, ancho });
        setUrl("");
        setTitulo("");
        setAlto
        setAncho
    };

    return (
        <form onSubmit={handleAñadirImagen}> 
        <input
        type="text"
        placeholder="url de la imagen"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        />
        <input
        type="text"
        placeholder="titulo de la imagen"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        />
        <input
        type="number"
        placeholder="alto de la imagen"
        value={alto}
        onChange={(e) => setAlto(e.target.value)}
        />

        <input
        type="number"
        placeholder="ancho de la imagen"
        value={ancho}
        onChange={(e) => setAncho(e.target.value)}
        />
        <button type="submit">Añadir</button>



        </form>
    );
}

export default ImageLoader;