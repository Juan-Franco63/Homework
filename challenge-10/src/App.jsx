import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount, decrementByAmount, pushToStack, popFromStack } from './Store/Slices/counterSlice';
import { useState } from 'react';

export const App = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count);
  const stack = useSelector((state) => state.counter.stack); // 🔥 Traer la pila desde Redux
  const [inputValue, setInputValue] = useState("");

  const HandleIncrementByAmount = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      dispatch(incrementByAmount(value));
    }
  };

  const HandleDecrementByAmount = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      dispatch(decrementByAmount(value));
    }
  };

  const handlePushToStack = () => {
    const value = parseInt(inputValue);
    if (!isNaN(value)) {
      dispatch(pushToStack(value));
      setInputValue("");
    }
  };

  const handlePopFromStack = () => {
    dispatch(popFromStack()); 
  };

  return (
    <div>
      <h1>Counter: {count}</h1> 
      <button onClick={() => dispatch(increment())}>Increment by 1</button>
      <button onClick={() => dispatch(decrement())}>Decrement by 1</button>

      <br />

      <div>
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a number"
        />
        <button onClick={HandleIncrementByAmount}>Increment by amount</button>
        <button onClick={HandleDecrementByAmount}>Decrement by amount</button>
        <button onClick={handlePushToStack}>Push to Stack</button>
        <button onClick={handlePopFromStack}>Pop from Stack</button>
      </div>

      <h2>Stack:</h2>
      <ul>
        {stack.map((item, index) => (
          <li key={index}>{item}</li> // 🔥 Mostrar los valores de la pila
        ))}
      </ul>
    </div>
  );
};
