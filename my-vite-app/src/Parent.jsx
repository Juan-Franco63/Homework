import React from 'react';
import {Child} from './Child';

export const Parent = () => {  
    
    const [counter, setCounter] = useState(10);

    const parentFunction = (data) => {
        console.log(data)
        setCounter(data)
    }

    return <div>
        <Child onCallParentFn= {parentFunction} counter={counter} />
    </div>
};