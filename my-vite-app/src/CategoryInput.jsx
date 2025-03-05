import { useState } from "react";

export const CategoryInput = ({ onNewCategory }) => {
    const [category, setCategory] = useState("");

    const handleInputChange = (event) => {
        setCategory(event.target.value); // Actualiza el estado del input
    };

    const handleAddCategory = () => {
        onNewCategory(category); // Llama a la función del padre
        setCategory(""); // Limpia el input
    };

    return (
        <>
            <input 
                type="text" 
                value={category} 
                onChange={handleInputChange} 
                placeholder="Nueva categoría"
            />
            <button onClick={handleAddCategory}>Agregar</button>
        </>
    );
};
