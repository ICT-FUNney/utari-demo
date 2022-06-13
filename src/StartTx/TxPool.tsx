import React from 'react';
import '../css/StartTx/TxPool.css';

/**
 * Txプール
 * @returns {HTMLElement}
 */
const TxPool: React.FC = () => {
    return (
        <div className='tx-pool-container'>
            <div className='tx-pool center'>
                <h3>トランザクションプール</h3>
            </div>
        </div>
    )
}

export default TxPool;
