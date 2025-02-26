import './App.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

const FirstApp = ({ value }) => {
    // Definir PropTypes
    FirstApp.propTypes = {
        value: PropTypes.number.isRequired
    };

    // Definir defaultProps
    FirstApp.defaultProps = {
        value: 0
    };

    // Estado del contador
    const [counter, setCounter] = useState(value);

    // Función para incrementar
    const handleAdd = () => {
        setCounter(counter + 1);
    };

    // Función para decrementar
    const handleSubstract = () => {
        setCounter(counter - 1);
    };

    // Función para resetear al valor por defecto (prop `value`)
    const handleReset = () => {
        setCounter(value);
    };

    return (
        <>
            <h1> Counter </h1>
            <span> {counter} </span>
            <button onClick={handleAdd}> +1 </button>
            <button onClick={handleSubstract}> -1 </button>
            <button onClick={handleReset}> Reset </button>
        </>
    );
};

export default FirstApp;


// FUNCTIONS 
// const FirstApp = ({value}) => {

//     const handleAdd = () => {
//         console.log ('calling handleAdd')
//     }

//     return (
//         <>
//             <h1> Counter </h1>
//             <span> { value } </span>
//             <button onClick={ handleAdd }> +1 </button>
//         </>
//     )
// }





// PROPTYPES
//import PropTypes from 'prop-types';

// const FirstApp = ({title, sum}) => {
//     return (
//         <>
//             <h1>{title}</h1>
//             <span>{sum}</span>
//         </>
//     )
// }

// FirstApp.propTypes = {
//     title: PropTypes.string.isRequired,
//     sum: PropTypes.number.isRequired
// }

// FirstApp.defaultProps = {
//     title: 'No hay titulo',
//     sum: 300
// }


    
//First Way to use props

// const FirstApp = ({title}) => {
//     return (
//         <>
//             <h1>{title}</h1>
//             <span>10</span>
//         </>
//     )
// }

//Second Way to use props

// const FirstApp = (props) => {
//     return (
//         <>
//             <h1>{props.title}</h1>
//             <span>10</span>
//         </>
//     )
// }