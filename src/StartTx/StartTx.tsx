import React from 'react';
import Wallet from './Wallet';
import '../css/StartTx/StartTx.css';

const StartTx: React.FC = () => {
    return (
        <div className='start-tx'>
            <Wallet />
        </div>
    )
}

export default StartTx;
