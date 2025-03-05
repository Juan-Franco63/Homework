import { useState } from "react";
import "./App.css";
import { CategoryInput } from "./CategoryInput";  // Importamos el componente hijo

export const ComponentApp = () => {
    const [categories, setCategories] = useState(["Ejemplo"]); // Estado para la lista de categorías

    const addCategory = (newCategory) => {
        if (!categories.includes(newCategory) && newCategory.trim() !== "") {
            setCategories([...categories, newCategory]);  // Agrega nueva categoría a la lista
        }
    };

    return (
        <>
            <h1>GifExpert</h1>
            <CategoryInput onNewCategory={addCategory} /> {/* Componente hijo */}
            <ol>
                {categories.map((category, key) => (
                    <li key={key}>{category}</li>
                ))}
            </ol>
        </>
    );
};
