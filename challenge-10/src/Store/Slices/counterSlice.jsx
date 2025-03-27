import { createSlice } from '@reduxjs/toolkit';

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 0,
        stack: [] // 🔥 Nuevo estado para el stack
    },
    reducers: {
        increment: (state) => {
            state.count += 1;
        },
        decrement: (state) => {
            state.count -= 1;
        },
        incrementByAmount: (state, action) => {
            state.count += action.payload;
        },
        decrementByAmount: (state, action) => {
            state.count -= action.payload;
        },
        pushToStack: (state, action) => {
            state.stack.push(action.payload);
        },
        popFromStack: (state) => {
            state.stack.pop();
        }
    }
});

export const { increment, decrement, incrementByAmount, decrementByAmount, pushToStack, popFromStack } = counterSlice.actions;


export default counterSlice.reducer;
