import React from  'react';

export const Child = ({ counter, onCallParentFn }) => {

    const letsCallParent = (evt) => {
        onCallParentFn("Hello world")
    };

    return (
        <button onClick = {(evt) => letsCallParent(evt)}>
            {counter}
        </button>
    );
};