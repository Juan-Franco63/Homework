import { useState } from "react";
import "./App.css";
import { CategoryInput } from "./CategoryInput"; 
import { Father } from "./Father";  // Importamos el nuevo componente

export const ComponentApp = () => {
    const [categories, setCategories] = useState(["Ejemplo"]);

    const addCategory = (newCategory) => {
        if (!categories.includes(newCategory) && newCategory.trim() !== "") {
            setCategories([...categories, newCategory]);
        }
    };

    return (
        <>
            <h1>GifExpert</h1>
            <CategoryInput onNewCategory={addCategory} /> 
            <ol>
                {categories.map((category, key) => (
                    <li key={key}>{category}</li>
                ))}
            </ol>

            {/* Aquí mostramos el nuevo componente */}
            <hr />
            <Father />
        </>
    );
};

