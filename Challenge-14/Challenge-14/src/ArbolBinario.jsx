import './BinaryTree.css';
import TreeNode from './TreeNode';
import React, {useState} from 'react';

const BinaryTree = (initialRoot) => { 
    const [tree, setTree] = useState(initialRoot);

    const insertNode = (current, side) => {
        if (!current[side]) {
            current[side] = {
                valor: Math.floor(Math.random() * 100),
                izquierda: null,
                derecha: null,
            }
            setTree({...tree});
        }
    }
    return (
        <div className='tree'>
            <treeNode node={tree} onInsert={insertNode} />
        </div>
    )
}