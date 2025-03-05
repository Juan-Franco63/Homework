const Imagenes = () => {
    return(
        <div>
            {Imagenes.length === 0 ? (
                <p>No hay imágenes</p>
            ) : (
                Imagenes.map((imagen) => (
                    <div key={imagen.id}>
                        <img src={imagen.url} alt={imagen.titulo} width={imagen.ancho} height={imagen.alto} />
                        <p>{imagen.titulo}</p>
                    </div>
                ))
            )}
            </div>
    )
}

export default Imagenes;