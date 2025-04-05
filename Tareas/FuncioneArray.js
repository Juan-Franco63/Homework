// 1. push() - Agrega elementos al final del array
let frutas = ['Manzana', 'Banana'];
frutas.push('Naranja');
console.log(frutas); // ['Manzana', 'Banana', 'Naranja']
/*
Explicación paso a paso:
1. El array original es ['Manzana', 'Banana'].
2. push('Naranja') agrega 'Naranja' al final del array.
3. El nuevo array es ['Manzana', 'Banana', 'Naranja'].
*/

// 2. pop() - Elimina el último elemento del array
let ultimaFruta = frutas.pop();
console.log(frutas); // ['Manzana', 'Banana']
console.log(ultimaFruta); // 'Naranja'
/*
Explicación paso a paso:
1. El array original es ['Manzana', 'Banana', 'Naranja'].
2. pop() elimina el último elemento ('Naranja') y lo devuelve.
3. El nuevo array es ['Manzana', 'Banana'].
*/

// 3. unshift() - Agrega elementos al inicio del array
frutas.unshift('Fresa');
console.log(frutas); // ['Fresa', 'Manzana', 'Banana']
/*
Explicación paso a paso:
1. El array original es ['Manzana', 'Banana'].
2. unshift('Fresa') agrega 'Fresa' al inicio del array.
3. El nuevo array es ['Fresa', 'Manzana', 'Banana'].
*/

// 4. shift() - Elimina el primer elemento del array
let primeraFruta = frutas.shift();
console.log(frutas); // ['Manzana', 'Banana']
console.log(primeraFruta); // 'Fresa'
/*
Explicación paso a paso:
1. El array original es ['Fresa', 'Manzana', 'Banana'].
2. shift() elimina el primer elemento ('Fresa') y lo devuelve.
3. El nuevo array es ['Manzana', 'Banana'].
*/

// 5. splice() - Agrega o elimina elementos en una posición específica
frutas.splice(1, 0, 'Kiwi', 'Mango');
console.log(frutas); // ['Manzana', 'Kiwi', 'Mango', 'Banana']
/*
Explicación paso a paso:
1. El array original es ['Manzana', 'Banana'].
2. splice(1, 0, 'Kiwi', 'Mango') agrega 'Kiwi' y 'Mango' en la posición 1.
3. El nuevo array es ['Manzana', 'Kiwi', 'Mango', 'Banana'].
*/

// 6. slice() - Extrae una parte del array sin modificar el original
let nuevasFrutas = frutas.slice(1, 3);
console.log(nuevasFrutas); // ['Kiwi', 'Mango']
console.log(frutas); // ['Manzana', 'Kiwi', 'Mango', 'Banana']
/*
Explicación paso a paso:
1. El array original es ['Manzana', 'Kiwi', 'Mango', 'Banana'].
2. slice(1, 3) extrae los elementos desde la posición 1 hasta la 2 (sin incluir la 3).
3. El nuevo array es ['Kiwi', 'Mango'], y el original no cambia.
*/

// 7. indexOf() - Encuentra la posición de un elemento en el array
let posicion = frutas.indexOf('Mango');
console.log(posicion); // 2
/*
Explicación paso a paso:
1. El array original es ['Manzana', 'Kiwi', 'Mango', 'Banana'].
2. indexOf('Mango') busca la posición de 'Mango'.
3. Devuelve 2, que es la posición de 'Mango'.
*/

// 8. includes() - Verifica si un elemento está en el array
console.log(frutas.includes('Banana')); // true
console.log(frutas.includes('Uva')); // false
/*
Explicación paso a paso:
1. El array original es ['Manzana', 'Kiwi', 'Mango', 'Banana'].
2. includes('Banana') verifica si 'Banana' está en el array.
3. Devuelve true porque 'Banana' está presente.
4. includes('Uva') devuelve false porque 'Uva' no está en el array.
*/

// 9. forEach() - Itera sobre los elementos de un array
frutas.forEach(fruta => console.log(fruta));
/*
Explicación paso a paso:
1. El array original es ['Manzana', 'Kiwi', 'Mango', 'Banana'].
2. forEach() ejecuta la función para cada elemento.
3. Imprime cada fruta en la consola.
*/

// 10. map() - Crea un nuevo array aplicando una función a cada elemento
let frutasEnMayusculas = frutas.map(fruta => fruta.toUpperCase());
console.log(frutasEnMayusculas); // ['MANZANA', 'KIWI', 'MANGO', 'BANANA']
/*
Explicación paso a paso:
1. El array original es ['Manzana', 'Kiwi', 'Mango', 'Banana'].
2. map() aplica la función toUpperCase() a cada elemento.
3. El nuevo array es ['MANZANA', 'KIWI', 'MANGO', 'BANANA'].
*/

// 11. filter() - Crea un nuevo array con elementos que cumplan una condición
let frutasConA = frutas.filter(fruta => fruta.includes('a'));
console.log(frutasConA); // ['Banana']
/*
Explicación paso a paso:
1. El array original es ['Manzana', 'Kiwi', 'Mango', 'Banana'].
2. filter() mantiene solo los elementos que incluyen la letra 'a'.
3. El nuevo array es ['Banana'].
*/

// 12. reduce() - Reduce un array a un solo valor
let numeros = [1, 2, 3, 4];
let suma = numeros.reduce((acumulador, numero) => acumulador + numero, 0);
console.log(suma); // 10
/*
Explicación paso a paso:
1. El array original es [1, 2, 3, 4].
2. reduce() suma todos los elementos, comenzando con un valor inicial de 0.
3. El resultado es 10.
*/

// 13. find() - Encuentra el primer elemento que cumple una condición
let primeraLetraM = frutas.find(fruta => fruta.startsWith('M'));
console.log(primeraLetraM); // 'Manzana'
/*
Explicación paso a paso:
1. El array original es ['Manzana', 'Kiwi', 'Mango', 'Banana'].
2. find() busca el primer elemento que comienza con 'M'.
3. Devuelve 'Manzana'.
*/

// 14. findIndex() - Encuentra el índice del primer elemento que cumple una condición
let indiceLetraM = frutas.findIndex(fruta => fruta.startsWith('M'));
console.log(indiceLetraM); // 0
/*
Explicación paso a paso:
1. El array original es ['Manzana', 'Kiwi', 'Mango', 'Banana'].
2. findIndex() busca el índice del primer elemento que comienza con 'M'.
3. Devuelve 0, que es la posición de 'Manzana'.
*/

// 15. some() - Verifica si al menos un elemento cumple una condición
let hayFrutasConO = frutas.some(fruta => fruta.includes('o'));
console.log(hayFrutasConO); // true
/*
Explicación paso a paso:
1. El array original es ['Manzana', 'Kiwi', 'Mango', 'Banana'].
2. some() verifica si al menos un elemento incluye la letra 'o'.
3. Devuelve true porque 'Mango' incluye 'o'.
*/

// 16. every() - Verifica si todos los elementos cumplen una condición
let todasTienenA = frutas.every(fruta => fruta.includes('a'));
console.log(todasTienenA); // false
/*
Explicación paso a paso:
1. El array original es ['Manzana', 'Kiwi', 'Mango', 'Banana'].
2. every() verifica si todos los elementos incluyen la letra 'a'.
3. Devuelve false porque 'Kiwi' no incluye 'a'.
*/

// 17. sort() - Ordena los elementos de un array (por defecto alfabéticamente)
let numerosDesordenados = [3, 1, 4, 2];
numerosDesordenados.sort();
console.log(numerosDesordenados); // [1, 2, 3, 4]
/*
Explicación paso a paso:
1. El array original es [3, 1, 4, 2].
2. sort() ordena los elementos de menor a mayor.
3. El nuevo array es [1, 2, 3, 4].
*/

// 18. reverse() - Invierte el orden de los elementos
numerosDesordenados.reverse();
console.log(numerosDesordenados); // [4, 3, 2, 1]
/*
Explicación paso a paso:
1. El array original es [1, 2, 3, 4].
2. reverse() invierte el orden de los elementos.
3. El nuevo array es [4, 3, 2, 1].
*/

// 19. join() - Une los elementos de un array en un string
let listaFrutas = frutas.join(', ');
console.log(listaFrutas); // 'Manzana, Kiwi, Mango, Banana'
/*
Explicación paso a paso:
1. El array original es ['Manzana', 'Kiwi', 'Mango', 'Banana'].
2. join(', ') une los elementos en un string separados por ', '.
3. El resultado es 'Manzana, Kiwi, Mango, Banana'.
*/

// 20. split() - Convierte un string en un array
let arrayDesdeString = listaFrutas.split(', ');
console.log(arrayDesdeString); // ['Manzana', 'Kiwi', 'Mango', 'Banana']
/*
Explicación paso a paso:
1. El string original es 'Manzana, Kiwi, Mango, Banana'.
2. split(', ') divide el string en un array usando ', ' como separador.
3. El nuevo array es ['Manzana', 'Kiwi', 'Mango', 'Banana'].
*/

// 21. concat() - Une dos o más arrays en uno nuevo
let verduras = ['Zanahoria', 'Lechuga'];
let alimentos = frutas.concat(verduras);
console.log(alimentos); // ['Manzana', 'Kiwi', 'Mango', 'Banana', 'Zanahoria', 'Lechuga']
/*
Explicación paso a paso:
1. El primer array es ['Manzana', 'Kiwi', 'Mango', 'Banana'].
2. El segundo array es ['Zanahoria', 'Lechuga'].
3. concat() une ambos arrays en uno nuevo.
4. El nuevo array es ['Manzana', 'Kiwi', 'Mango', 'Banana', 'Zanahoria', 'Lechuga'].
*/

// 22. fill() - Rellena el array con un valor
let arrayVacio = new Array(5).fill(0);
console.log(arrayVacio); // [0, 0, 0, 0, 0]
/*
Explicación paso a paso:
1. Se crea un array vacío de longitud 5.
2. fill(0) rellena todos los elementos con el valor 0.
3. El nuevo array es [0, 0, 0, 0, 0].
*/

// 23. flat() - Aplana arrays anidados en uno solo
let arrayAnidado = [1, [2, 3], [4, 5]];
let arrayPlano = arrayAnidado.flat();
console.log(arrayPlano); // [1, 2, 3, 4, 5]
/*
Explicación paso a paso:
1. El array original es [1, [2, 3], [4, 5]].
2. flat() aplana los arrays anidados en un solo array.
3. El nuevo array es [1, 2, 3, 4, 5].
*/

// 24. from() - Crea un array desde un objeto iterable (como un string)
let arrayDesdeString2 = Array.from('Hola');
console.log(arrayDesdeString2); // ['H', 'o', 'l', 'a']
/*
Explicación paso a paso:
1. El string original es 'Hola'.
2. Array.from() convierte el string en un array de caracteres.
3. El nuevo array es ['H', 'o', 'l', 'a'].
*/
