import React from 'react';
import Block from "./Block";
import { UserCtx } from '../User';
import '../css/BlockChain/BlockChain.css';


function BlockChain() {
    const userCtxValue = React.useContext(UserCtx);
    userCtxValue.checkLogin();

    return (
        <div className='block-chain'>
            <ol>
                {[...Array(15)].map((_, i) => <li key={i}><Block nth={i} /></li>)}
            </ol>
        </div>
    )
}

export default BlockChain;
