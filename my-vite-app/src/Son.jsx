import React, { useState } from 'react';

// React.memo evita renderizados innecesarios
export const Son = React.memo(({ numero, increment }) => {
    const [valorBoton, setValorBoton] = useState(numero);

    const handleClick = () => {
        increment(numero); // Aumenta el total en `Father`
        setValorBoton((prev) => prev + numero); // Actualiza el botón
    };

    console.log('Son renderizado:', numero);

    return (
        <button className='btn btn-primary mr-3' onClick={handleClick}>
            {valorBoton}
        </button>
    );
});
