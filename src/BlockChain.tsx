import React from 'react';
import Block from "./Block";
import './css/BlockChain.css';


function BlockChain() {
    return (
        <div className='block-chain'>
            <ol>
                {[...Array(15)].map((_, i) => <li key={i}><Block nth={i + 1} /></li>)}
            </ol>
        </div>
    )
}

export default BlockChain;
